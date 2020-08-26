const db = require("../models/index.model");
const { populate } = require("../models/todos.model");

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
  const todoID = req.body._id
 
  db.ToDo.findOneAndUpdate({ _id: todoID }, req.body, {
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
  const { listID, filters = [], sorts = {} } = req.body;

  let query, key;
  let filterArray = [];
  let subQuery = [];
  let sortObj = {};
  let populateObj = {};

  if (Object.keys(sorts).length) {
    for (let field in sorts) {
      if (sorts[field] !== 0) {
        sortObj[field] = sorts[field];
      }
    }
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

  if (listID === "MAIN_INPUT_ID") {
    query = db.ToDoList.find({});
  } else {
    query = db.ToDoList.findById(listID);
  }

  populateObj.path = "todos";

  if (filters.length) {
    populateObj.match = { $or: filterArray };
  }

  if (Object.keys(sortObj).length) {
    populateObj.options = { sort: sortObj };
  }

  query.populate(populateObj).collation({ locale: "en" });

  try {
    const filteredList = await query.exec();
    console.log(`----------------
    ${JSON.stringify(filteredList)}
    -----------------`);
    if (listID === "MAIN_INPUT_ID") {
      res.json(filteredList);
    } else {
      res.json(filteredList.todos);
    }
  } catch (error) {
    res.json(error);
  }
};

exports.resultsPreview = async (req, res) => {
  const { listID, filters, keyword } = req.body;
  let filterArray = [];

  // pushing the keyword to filter array
  for (field of fieldArray) {
    filterArray.push({
      [field]: { $regex: new RegExp(`\w*${keyword}\w*`, "i") },
    });
  }

  // building query
  let query;

  if (listID === "MAIN_INPUT_ID") {
    query = db.ToDoList.find({});
  } else {
    query = db.ToDoList.findById(listID);
  }

  query.populate({
    path: "todos",
    match: { $or: filterArray },
    select: {
      title: 1,
      owner: 1,
      details: 1,
      lists: 1,
      _id: 0,
    },
  });

  // executing query and sending results
  const queryData = await query.exec();
  const todoData = queryData ? [queryData].flat() : [];

  res.json(todoData);

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

exports.removeList = async (req, res) => {
  const {listID} = req.params;

  try {
    const deletedList = await db.ToDoList.findByIdAndRemove(listID);
    const todosToDelete = deletedList.todos.map(objID => objID.toString());
    const deletedToDos = await db.ToDo.deleteMany({ _id: { $in: todosToDelete} });

    res.json(deletedList._id);
  } catch (err) {
    res.json(err);
  }
};

module.exports = exports;
