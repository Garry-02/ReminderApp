const express = require("express");
const passport = require("../controller/middleware/passport");
const { forwardAuthenticated } = require("../controller/middleware/checkAuth");
const { route } = require("./indexRoute");
const router = express.Router();
//shows login page/register page
//localhost:3002/auth/login
router.get("/login", (req, res) => res.render("auth/login"));
router.get("/register", forwardAuthenticated, (req, res) => res.render("auth/register"));

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
