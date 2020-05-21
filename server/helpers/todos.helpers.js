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

exports.updateColor = (req, res) => {
  db.Todo.findOneAndUpdate(
    { _id: req.params.todoId },
    { color: req.body },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((updatedTodo) => res.json(updatedTodo))
    .catch((err) => res.send(err));
};

exports.updateTodoField = (req, res) => {

  const {id, field, value} = req.body;

  console.log(`id: ${id}, field: ${field}, value: ${value}`);

  db.Todo.findOneAndUpdate(
    { _id: id },
    { [field]: value },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((updatedTodo) => {
      const {_id, [field]: value} = updatedTodo;
      res.send({_id, [field]: value});
    })
    .catch((err) => res.send(err));
};

exports.filterTodos = (req, res) => {
  const { filters } = req.body;
  let query, key, filterArray;

  if (filters.length === 0) {
    query = db.Todo.find({});
  } else {
    filterArray = filters.map((filter) => {
      key = Object.keys(filter)[0];
      return { [key]: { $regex: filter[key], $options: "i" } };
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
  const { filters, keyword } = req.body;
  console.log(`filters: ${JSON.stringify(filters)}`);
  console.log(`word: ${keyword}`);
  const fieldArray = ["owner", "title", "details"];
  let filterArray = [];
  let query, key;
  let freqCounter = {};

  for (field of fieldArray) {
    freqCounter[field] = 0;
  }

  filters.forEach((item) => {
    key = Object.keys(item)[0];
    if (item[key] === keyword) freqCounter[key]++;
  });

  for (field of fieldArray) {
    if (freqCounter[field] === 0)
      filterArray.push({
        [field]: { $regex: new RegExp(`\w*${keyword}\w*`, "i") },
      });
  }

  query = db.Todo.find({ $or: filterArray }).select({
    name: 1,
    owner: 1,
    details: 1,
    _id: 0,
  });

  query
    .exec()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => res.send(err));
};

module.exports = exports;
