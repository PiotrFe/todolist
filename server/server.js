const express = require("express");
const cookieSession = require("cookie-session");
const { SESSION_SECRET } = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
require("./services/passport");

const toDoRoutes = require("./routes/todos.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
app.use(
  cookieSession({
    name: "session",
    keys: [SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use("/api/todos", toDoRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = app;
