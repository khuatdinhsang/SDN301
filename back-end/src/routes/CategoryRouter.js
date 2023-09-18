const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');
const { userMiddleware, adminMiddleware } = require('../middlewares/AdminMiddleware');
const { validateCreateCategory } = require('../validation/CategoryValidation');
router.post('/create', adminMiddleware, validateCreateCategory, CategoryController.createCategory)
router.put('/update/:id', adminMiddleware, validateCreateCategory, CategoryController.updateCategory)
router.get('/getAll', CategoryController.getAllCategory)
router.get('/:id', CategoryController.getDetailCategory)
module.exports = router

