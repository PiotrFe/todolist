const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: String,
    details: String,
    draft: String,
    detailsDraft: String,
    owner: String,
    dueDate: Date,
    done: Boolean,
    editMode: Boolean,
    detailsVisible: Boolean,
    category: String
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;