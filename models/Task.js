const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    description:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Tasks', TaskSchema);