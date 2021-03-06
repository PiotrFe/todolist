const mongoose = require("mongoose");
mongoose.set("debug", true);

// mongoose.connect("mongodb://localhost:27017/todos", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


mongoose.Promise = Promise;

module.exports.ToDo = require("./todos.model");
module.exports.ToDoList = require("./todolist.model");
module.exports.User = require("./user.model");
