const db = require("../models/index.model");
const jwt = require('jwt-simple');
const config = require("../config");
// const { create } = require("../models/user.model");

const createTokenForUser = user => {
    const timestamp = new Date().getTime();

    return jwt.encode({sub: user._id, iat: timestamp}, config.JWT_SECRET)
}

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
      const token = createTokenForUser(user);
      req.session.token = token;
      res.status(201).send(token);
    });
  });
};

exports.signIn = (req, res) => {
    // user object attached to req object by passport middleware
    req.session.token = createTokenForUser(req.user);

    res.status(200).send("Logged in");
};

exports.signOut = (req, res) => {
    req.session = null;
    res.status(200).send("Logged out");
}

exports.verifySession = (req, res) => {
  // user object attached to req object by passport middleware
  if (req.user) {
    return res.status(200).send("Logged in");
  }
  // if (req.session.token) {
  //   return res.status(200).send("Logged in");
  // } 
  return res.status(401).send("No active session");
}

module.exports = exports;
