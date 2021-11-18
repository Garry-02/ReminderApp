const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin_controller');


router.get('/', adminController.adminmode);
router.get('/delete', adminController.revoke);
module.exports = router