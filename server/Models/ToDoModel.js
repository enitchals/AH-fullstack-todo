const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    body: {
        type: String,
    },
    status: {
        type: String,
        enum: ["To Do", "In Process", "Done"],
        default: "To Do",
    }
});

module.exports = mongoose.model('ToDo', toDoSchema);