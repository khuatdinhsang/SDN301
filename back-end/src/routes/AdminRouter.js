const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/AdminController')
const { adminMiddleware } = require('../middlewares/AdminMiddleware');

router.get('/manager/order', adminMiddleware, AdminController.totalOrder);
module.exports = router
