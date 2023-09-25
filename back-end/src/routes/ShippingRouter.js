const express = require('express')
const router = express.Router()
const ShippingController = require('../controllers/ShippingController')
const { validateCreateProduct } = require('../validation/ProductValidation');
const { adminMiddleware } = require('../middlewares/AdminMiddleware');
router.get('/startReceiveOrder', ShippingController.startReceiveOrder);
module.exports = router