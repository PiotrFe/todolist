const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: String,
    details: String,
    draft: String,
    detailsDraft: String,
    owner: String,
    dueDate: Date,
    done: Boolean,
    editMode: Boolean,
    detailsVisible: Boolean,
    category: String,
    color: String,
    lists: [Schema.Types.ObjectId]
});

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo;