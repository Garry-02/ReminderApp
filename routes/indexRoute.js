const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
//welcome page localhost:3002
router.get("/", (req, res) => {
  res.send("welcome");
});

//if ensureAuthenticated gives permission then the code will run
//reminders page ("dasboard") localhost:3002/reminders
router.get("/reminders", ensureAuthenticated, (req, res) => {
  res.render("reminders", {
    user: req.user,
  });
});

module.exports = router;
