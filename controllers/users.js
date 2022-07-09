const User = require('../models/User.js');

const redis = require('redis');
const redisClient = redis.createClient({legacyMode: true});
redisClient.connect()
const DEFAULT_EXPIRATION = 3600

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('delete_cache_users', () => {
    console.log('delete cache users')
    redisClient.del('users');
});

module.exports = {
    getUsers : async (req, res) => {
        redisClient.get('users', async (err, users) => {
            if (users == null) {
                console.log('Creating users cache');
                users = await User.find();
                redisClient.setex('users', DEFAULT_EXPIRATION, JSON.stringify(users));
            } else {
                console.log('Using users cache')
                users = JSON.parse(users)
            }
            res.json(users);
        });
    },
    
    createUser : async (req, res) => {
        const user = new User({
            name: req.body.name,
            age: req.body.age
        });
        const savedUser = await user.save();
        res.json(savedUser);
        emitter.emit('delete_cache_users');
    },
    
    updateUser : async (req, res) => {
        console.log(req.body)
        const user = await User.findById(req.body.id);
        if (req.body.name) user.name = req.body.name;
        if (req.body.age) user.age = req.body.age;
        const updatedUser = await user.save();
        res.json(updatedUser);
        emitter.emit('delete_cache_users');
    },
    
    updateNameUser :  async (req, res) => {
        const updatedUser = await User.updateOne(
            { _id: req.body.id },
            { $set: { name: req.body.name } }
        );
        res.json(updatedUser);
        emitter.emit('delete_cache_users');
    },
    
    deleteUser : async (req, res) => {
        const removedUser = await User.deleteOne({ _id: req.body.id })
        res.json(removedUser);
        emitter.emit('delete_cache_users');
    }
}