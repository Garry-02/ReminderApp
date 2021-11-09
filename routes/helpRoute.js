const express = require("express");
const router = express.Router();


///http://localhost:3002/help
router.get("/", (req, res) => {
  res.send("welcome to the help page");
});
///http://localhost:3002/help/policy
router.get("/policy", (req, res) => {
    res.send("welcome to the policy page");
  });

  ///http://localhost:3002/help/contactus
router.get("/contactus", (req, res) => {
    res.send("welcome to the contactus page");
  });
module.exports = router;
