const express = require("express");
const helpers = require("../helpers/auth.helpers");
const router = express.Router();
const passport = require("passport");

const requireSignIn = passport.authenticate("local");
const requireAuth = passport.authenticate("jwt");

router.use("/signin", requireSignIn);
router.use("/session", requireAuth);

router.route("/signup")
  .post(helpers.signUp);

router.route("/signin")
  .post(helpers.signIn)

router.route("/signout")
  .post(helpers.signOut);

router.route("/session")
  .get(helpers.verifySession)


module.exports = router;
