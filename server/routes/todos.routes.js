const express = require("express");
const helpers = require('../helpers/todos.helpers');
const router = express.Router();

router.route("/")
  .get(helpers.getTodos);

module.exports = router;
