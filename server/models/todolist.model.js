const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
    title: String,
    owner: String,
    todos: [{type: Schema.Types.ObjectId, ref: "Todo"}]
})

const ToDoList = mongoose.model("ToDoList", todoListSchema);

module.exports = ToDoList;