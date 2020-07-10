const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
    title: String,
    owner: String,
    filters: [],
    todos: [{type: Schema.Types.ObjectId, ref: "ToDo"}]
})

const ToDoList = mongoose.model("ToDoList", todoListSchema);

module.exports = ToDoList;