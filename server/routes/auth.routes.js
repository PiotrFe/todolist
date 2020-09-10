const express = require("express");
const helpers = require("../helpers/auth.helpers");
const router = express.Router();
const passport = require("passport");

const requireSignIn = passport.authenticate("local");

router.use("/signin", requireSignIn);

router.route("/signup")
  .post(helpers.signUp);

router.route("/signin")
  .post(helpers.signIn);

router.route("/signout")
  .post(helpers.signOut);

module.exports = router;
