const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const toDoRoutes = require("./routes/todos.routes");

const app = express();

const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
app.use("/api/todos", toDoRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;
