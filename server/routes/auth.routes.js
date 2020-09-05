const express = require("express");
const helpers = require("../helpers/auth.helpers");
const router = express.Router();
const passport = require("passport");
require("../services/passport");

const requireSignIn = passport.authenticate("local", {session: false
});

router.use("/signin", requireSignIn);

router.route("/signup").post(helpers.signUp);

router.route("/signin")
  .post(helpers.signIn)
  .get((req, res) => res.send("SIGN IN"));

module.exports = router;
