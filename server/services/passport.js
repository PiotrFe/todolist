const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../models/index.model");

const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  
  db.User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: "Username not found" });

    user.comparePasswords(password, (err, isMatch) => {
        
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    });
  });
});

passport.use(localLogin);
