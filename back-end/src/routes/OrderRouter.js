const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const { validateCreateProduct } = require('../validation/ProductValidation');
const { auth } = require('../middlewares/AdminMiddleware');
router.post('/create', auth, OrderController.createOrder);

module.exports = router