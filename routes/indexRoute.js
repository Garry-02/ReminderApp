const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { ensureAuthenticated, isAdmin } = require("../controller/middleware/checkAuth");
//welcome page localhost:3002
router.get("/", async (req, res) => {
  res.send("welcome");
  const clientId = process.env.CLIENT_ID;
  const query = "";
  const url = '';
  const data = await fetch(url);
  const jsonData = await data.json();
  console.log(jsonData);
  console.log(imageFromUnsplash);
});

router.get("/auth", () => console.log("in index"));

router.get("/auth/register", (req, res) => {
  res.render("/register")

  });


//if ensureAuthenticated gives permission then the code will run
//reminders page  localhost:3002/reminders
router.get("reminders", ensureAuthenticated, (req, res) => {
  res.render("reminders", {
    user: req.user,
  });
});

module.exports = router;
