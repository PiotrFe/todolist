const db = require("../models/index.model");

const fieldArray = ["owner", "title", "details"];

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
  const { listID, filters = [], sorts = [] } = req.body;

  let query, key;
  let filterArray = [];
  let subQuery = [];
  let sortObj = {};

  if (sorts.length) {
    sortObj = sorts.reduce((acc, { field, sortDirection }) => {
      if (sortDirection === 1) {
        return Object.assign(acc, { [field]: 1 });
      } else if (sortDirection === -1) {
        return Object.assign(acc, { [field]: -1 });
      } else return acc;
    }, {});
  }

  if (filters.length) {
    filterArray = filters.flatMap((filter) => {
      key = Object.keys(filter)[0];
      if (key === "all") {
        for (field of fieldArray) {
          subQuery.push({ [field]: { $regex: filter[key], $options: "i" } });
        }
        return subQuery;
      } else {
        return { [key]: { $regex: filter[key], $options: "i" } };
      }
    });
  }

  query = db.ToDoList.findById(listID);

  filters.length ? 
    query.populate({
    path: "todos",
    match: { $or: filterArray },
  }) : 
  query.populate({
    path: "todos",
  });

  sorts.length ? query.sort(sortObj).collation({ locale: "en" }) : null;

  try {
    const filteredList = await query.exec();
    res.json(filteredList.todos);
  } catch (error) {
    res.json(error);
  }
};

exports.resultsPreview = async (req, res) => {
  const { listID, filters, keyword } = req.body;
  console.log(
    `listID: ${listID}, filters${JSON.stringify(filters)} - ${Array.isArray(
      filters
    )}, keyword: ${keyword}`
  );
  let filterArray = [];

  // pushing the keyword to filter array
  for (field of fieldArray) {
    filterArray.push({
      [field]: { $regex: new RegExp(`\w*${keyword}\w*`, "i") },
    });
  }

  // building query
  const query = db.ToDoList.findById(listID).populate({
    path: "todos",
    match: { $or: filterArray },
    select: {
      title: 1,
      owner: 1,
      details: 1,
      _id: 0,
    },
  });

  // executing query and sending results
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

exports.addList = async (req, res) => {
  const { title } = req.body;

  const newList = new db.ToDoList();
  newList.title = title;

  try {
    const savedList = await newList.save();
    res.json(savedList);
  } catch (err) {
    res.json(err);
  }
};

module.exports = exports;
