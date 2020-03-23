const db = require("../models/index.model");

exports.getTodos = (req, res) => {
    db.Todo.find()
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            res.send(err);
        });
}

module.exports = exports;