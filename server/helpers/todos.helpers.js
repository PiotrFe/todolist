const db = require("../models/index.model");

exports.getTodos = (req, res) => {
  db.Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
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
  db.Todo.deleteOne({ _id: req.params.todoId })
    .then(() => res.json({ _id: req.params.todoId }))
    .catch((err) => res.send(err));
};

exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((updatedTodo) => res.json(updatedTodo))
    .catch((err) => res.send(err));
};

exports.filterTodos = (req, res) => {
  const { filters } = req.body;
  let query, filterArray;

  if (filters.length === 0) {
    query = db.Todo.find({});
  } else {
    filterArray = filters.map((item) => {
      return { [item.header]: { $regex: item.entry, $options: "i" } };
    });
    query = db.Todo.find({ $or: filterArray });
  }

  // db.Todo.find({$or: [{title: "piotr"}, {[req.body.header]: {"$regex": req.body.entry, "$options": "i" } }]})
  // db.Todo.find({ $or: filterArray })
  query
    .exec()
    .then((todos) => res.json(todos))
    .catch((err) => res.send(err));
};

exports.test = (req, res) => {
  res.send("Test successfull");
};

module.exports = exports;
