const Task = require('../models/Task.js');
const User = require('../models/User.js');

const redis = require('redis');
const redisClient = redis.createClient({legacyMode: true});
redisClient.connect()
const DEFAULT_EXPIRATION = 3600

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('delete_cache_tasks', () => {
    console.log('delete cache tasks')
    redisClient.del('tasks');
});

module.exports = {
    getTasks : async (req, res) => {
        redisClient.get('tasks', async (err, tasks) => {
            if (tasks == null) {
                console.log('Creating tasks cache');
                tasks = await Task.find().populate('owner');
                redisClient.setex('tasks', DEFAULT_EXPIRATION, JSON.stringify(tasks));
            } else {
                console.log('Using tasks cache')
                tasks = JSON.parse(tasks)
            }
            res.json(tasks);
        });
    },
    
    createTask : async (req, res) => {
        const user = await User.findById(req.body.user_id);
        const task = new Task({
            owner: user,
            description: req.body.description
        });
        const savedTask = await task.save();
        res.json(savedTask);
        emitter.emit('delete_cache_tasks');
    },
    
    deleteTask : async (req, res) => {
        const removedTask = await Task.deleteOne({ _id: req.body.id })
        res.json(removedTask);
        emitter.emit('delete_cache_tasks');
    }
}