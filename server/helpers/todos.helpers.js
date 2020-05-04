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
  let query, key, entry, filterArray;

  if (filters.length === 0) {
    query = db.Todo.find({});
  } else {
    filterArray = filters.map((item) => {
      key = Object.keys(item)[0];
      entry = item[key];
      
      return { [key]: { $regex: entry, $options: "i" } };
    });
    query = db.Todo.find({ $or: filterArray });
  }

  query
    .exec()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => res.send(err));
};

exports.resultsPreview = (req, res) => {
  const { word } = req.body;
  const fieldArray = ["owner", "title", "details"];
  let filterArray = [];
  let query;

  for (field of fieldArray) {
    filterArray.push({ [field]: { $regex: word, $options: "i" } });
  }

  query = db.Todo.find({ $or: filterArray }).select({"name": 1, "owner": 1, "details": 1, "_id": 0});

  query
    .exec()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => res.send(err));
};

module.exports = exports;
