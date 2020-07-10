const db = require("../models/index.model");

exports.getTodos = (req, res) => {
  db.ToDoList.find()
    .populate("todos")
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.addTodo = async (req, res) => {
  try {
    const newToDo = await db.ToDo.create(req.body.todo);
    const list = await db.ToDoList.findById(req.body.listID);
    newToDo.lists = [list._id];
    list.todos = [...list.todos, newToDo.id];
    const savedToDo = await newToDo.save();
    const savedList = await list.save();

    return res.json({ listID: savedList._id, todo: savedToDo });
  } catch (err) {
    return res.send(err);
  }
};

exports.removeTodo = async (req, res) => {
  const listID = req.body.listID;
  const todoID = req.body.todoID;
  let updatedTodo;

  try {
    const list = await db.ToDoList.findById(listID);
    const todo = await db.ToDo.findById(todoID);
    list.todos = list.todos.filter((id) => id != todoID);
    todo.lists = todo.lists.filter((id) => id != listID);
    if (todo.lists.length === 0) {
      updatedTodo = await db.ToDo.findByIdAndDelete(todoID);
    } else {
      updatedTodo = await todo.save();
    }
    const savedList = await list.save();

    return res.json({ listID: savedList._id, todoID: todoID });
  } catch (err) {
    return res.send(err);
  }
};

exports.updateTodo = (req, res) => {
  db.ToDo.findOneAndUpdate({ _id: req.params.todoId }, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((updatedTodo) => res.json(updatedTodo))
    .catch((err) => res.send(err));
};

exports.updateTodoField = (req, res) => {
  const { todoID, field, value } = req.body;

  console.log(req.body);

  db.ToDo.findOneAndUpdate(
    { _id: todoID },
    { [field]: value },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((updatedTodo) => {
      res.send({ todoID, field, value });
    })
    .catch((err) => res.send(err));
};

exports.filterTodos = async (req, res) => {
  const { listID, filters } = req.body;

  let query, key, filterArray;

  // let sortObj = sorts.reduce((acc, { field, sortDirection }) => {
  //   if (sortDirection === 1) {
  //     return Object.assign(acc, { [field]: 1 });
  //   } else if (sortDirection === -1) {
  //     return Object.assign(acc, { [field]: -1 });
  //   } else return acc;
  // }, {});

  query = db.ToDoList.findById(listID);

  if (filters.length > 0) {
    filterArray = filters.map((filter) => {
      key = Object.keys(filter)[0];
      return { [key]: { $regex: filter[key], $options: "i" } };
    });
    query.populate({
      path: "todos",
      match: { $or: filterArray },
    });
  } else {
    query.populate({
      path: "todos",
    });
  }

  try {
    const filteredList = await query.exec();
    res.json(filteredList.todos);
  } catch (error) {
    res.json(error);
  }

  query
    // .sort(sortObj)
    // .collation({ locale: "en" })
    // .exec()
    // .then((todos) => {
    //   res.json(todos);
    // })
    // .catch((err) => res.send(err));
};

exports.resultsPreview = async (req, res) => {
  const { listID, filters, keyword } = req.body;
  console.log(
    `listID: ${listID}, filters${filters} - ${Array.isArray(
      filters
    )}, keyword: ${keyword}`
  );
  const fieldArray = ["owner", "title", "details"];
  let filterArray = [];
  let key;
  let freqCounter = {};

  // creating frequency counter for existing filters
  for (field of fieldArray) {
    freqCounter[field] = 0;
  }

  // counting existing filters
  filters.forEach((item) => {
    key = Object.keys(item)[0];
    if (item[key] === keyword) freqCounter[key]++;
  });

  // pushing the keyword to filter array only if filter does not exist
  for (field of fieldArray) {
    if (freqCounter[field] === 0)
      filterArray.push({
        [field]: { $regex: new RegExp(`\w*${keyword}\w*`, "i") },
      });
  }

  // building query
  const query = db.ToDoList.findById(listID).populate({
    path: "todos",
    match: { $or: filterArray },
    select: {
      name: 1,
      owner: 1,
      details: 1,
      _id: 0,
    },
  });

  const queryData = await query.exec();
  const todoData = queryData ? queryData.todos : [];
  res.send(todoData);

  // query = db.ToDo.find({ $or: filterArray }).select({
  //   name: 1,
  //   owner: 1,
  //   details: 1,
  //   _id: 0,
  // });

  // executing query
  // query
  //   .exec()
  //   .then((todos) => {
  //     res.json(todos);
  //   })
  //   .catch((err) => res.send(err));
};

module.exports = exports;
