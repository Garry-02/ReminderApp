const express = require("express");
const router = express.Router();
const adminController = require('../controller/admin_controller');
const { isAdmin } = require('../controller/middleware/checkAuth');

router.get('/', isAdmin, adminController.adminmode);
router.get('/delete', isAdmin, adminController.revoke);
module.exports = router