const express = require("express");
const passport = require("../controller/middleware/passport");
const { forwardAuthenticated } = require("../controller/middleware/checkAuth");
const { route } = require("./indexRoute");
const router = express.Router();
//shows login page/register page
//localhost:3002/auth/login
router.get("/login", (req, res) => res.render("auth/login"));
router.get("/dashboard", (req, res) => res.render("auth/dashboard", { user: req.user}));
router.get("/github", passport.authenticate("github"));
router.get("/register", forwardAuthenticated, (req, res) => res.render("auth/register"));

router.get( 
  "/github/callback",
  passport.authenticate("github"),
  function (req, res) {
    res.redirect("/auth/dashboard");
  }
);
//code used when login button clicked
//localhost:3002/auth/login
router.post(
  "/login",
  //core of passport will handle authentication via middleware
  //local can be changed to say twitter or whatever you want to use to login
  passport.authenticate("local", {
    successRedirect: "/dashboard",
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
