<<<<<<< HEAD
const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { route } = require("./indexRoute");
const router = express.Router();
//shows login page/register page
//localhost:3002/auth/login
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
router.get("/register", forwardAuthenticated, (req, res) => res.render("register"));

//code used when login button clicked
//localhost:3002/auth/login
router.post(
  "/login",
  //core of passport will handle authentication via middleware
  //local can be changed to say twitter or whatever you want to use to login
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);
//code used when logout button clicked
//localhost:3002/auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
=======
const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { route } = require("./indexRoute");
const router = express.Router();
//shows login page/register page
//localhost:8081/auth/login
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
router.get("/register", forwardAuthenticated, (req, res) => res.render("register"));

//code used when login button clicked
//localhost:8081/auth/login
router.post(
  "/login",
  //core of passport will handle authentication via middleware
  //local can be changed to say twitter or whatever you want to use to login
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);
//code used when logout button clicked
//localhost:8081/auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
>>>>>>> 847570d87c2be356c35a785e2d80bd80d472c465
