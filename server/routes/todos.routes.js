const express = require("express");
const helpers = require("../helpers/todos.helpers");
const router = express.Router();

router.route("/")
  .get(helpers.getTodos)
  .post(helpers.addTodo);

router.route("/filters")
  .post(helpers.filterTodos);

router.route("/preview")
  .post(helpers.resultsPreview);

router.route("/:todoId")
  .post(helpers.removeTodo)
  .put(helpers.updateTodo);

module.exports = router;
