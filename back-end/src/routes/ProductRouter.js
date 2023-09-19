const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const { validateCreateProduct } = require('../validation/ProductValidation');
const { adminMiddleware } = require('../middlewares/AdminMiddleware');
router.post('/create', adminMiddleware, validateCreateProduct, ProductController.createProduct);
router.put('/update/:id', adminMiddleware, validateCreateProduct, ProductController.updateProduct);
router.get('/getAll', ProductController.getAllProduct);
router.delete('/delete/:id', adminMiddleware, ProductController.deleteProduct);
router.get('/getBySubcategoryId', ProductController.getAllProductBySubCategoryId)
router.get('/getByCategoryId', ProductController.getAllProductByCategoryId)
router.get('/search', ProductController.searchProductByName)
router.get('/:id', ProductController.getDetailProduct);
module.exports = router