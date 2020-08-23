const express = require("express");
const helpers = require("../helpers/todos.helpers");
const router = express.Router();

router.route("/")
    .get(helpers.getTodos)
    .post(helpers.addTodo);

router.route("/filters")
    .post(helpers.filterTodos);

router.route("/lists")
    .post(helpers.addList);

router.route("/lists/:listID")
    .post(helpers.removeList)

router.route("/preview/:listId")
    .post(helpers.resultsPreview);

router.route("/:listId")
    .post(helpers.removeTodo)
    .put(helpers.updateTodo);

router.route("/:todoID").patch(helpers.updateTodoField);

module.exports = router;
