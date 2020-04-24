const db = require("../models/index.model");

exports.getTodos = (req, res) => {
  db.Todo.find()
    .then(todos => {
      res.json(todos);
    })
    .catch(err => {
      res.send(err);
    });
};

exports.addTodo = (req, res) => {
  db.Todo.create(req.body, (err, todo) => {
    if (err) res.send(err);
    console.log(JSON.stringify(todo));
    res.json(JSON.stringify(todo));

  });
};

exports.removeTodo = (req, res) => {
    db.Todo.deleteOne({_id: req.params.todoId})
        .then(() => res.json({_id: req.params.todoId}))
        .catch(err => res.send(err));
}

exports.updateTodo = (req, res) => {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true, useFindAndModify: false})
    .then(updatedTodo => res.json(updatedTodo))
    .catch(err => res.send(err));
}

module.exports = exports;
