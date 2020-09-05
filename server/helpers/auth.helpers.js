const db = require("../models/index.model");

exports.signUp = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  db.User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);

    if (existingUser) return res.status(422).send({ error: "Email is in use" });

    const user = new db.User({
      email,
      password,
    });

    user.save((err) => {
      if (err) return next(err);
      res.send(user);
    });
  });
};

exports.signIn = async (req, res) => {
    // user object attached to req object by passport middleware
    res.send(req.user);
};

module.exports = exports;
