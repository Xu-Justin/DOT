const express = require('express');
const { getUsers, createUser, updateUser, updateNameUser, deleteUser } = require('../controllers/users.js');

const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const router = express.Router();

router.get('/', use(getUsers));
router.post('/', use(createUser));
router.put('/', use(updateUser));
router.patch('/', use(updateNameUser));
router.delete('/', use(deleteUser));

module.exports = router;