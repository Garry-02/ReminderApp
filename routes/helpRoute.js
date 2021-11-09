<<<<<<< HEAD
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
=======
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
>>>>>>> 847570d87c2be356c35a785e2d80bd80d472c465
