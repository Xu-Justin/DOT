const express = require('express');
const { getTasks, createTask, deleteTask } = require('../controllers/tasks.js');

const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const router = express.Router();

router.get('/', use(getTasks));
router.post('/', use(createTask));
router.delete('/', use(deleteTask));

module.exports = router;