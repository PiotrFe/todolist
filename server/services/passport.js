const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models/index.model");
const config = require("../config");

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

const cookieExtractor = (req) => {
  let token = null;
  console.log("======================")
  console.log(req.session.token);
  if (req && req.session && req.session.token) {
    token = req.session.token;
  }
  return token;
}

const jwtOptions = {
  jwtFromRequest: (req) => cookieExtractor(req),
  secretOrKey: config.JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  db.User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    else return done(null, false);
  });
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.User.findById(id, function (err, user) {
    done(null, user);
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
