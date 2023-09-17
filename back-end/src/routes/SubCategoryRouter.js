const express = require('express')
const router = express.Router()
const SubCategoryController = require('../controllers/SubCategoryController');
const { adminMiddleware } = require('../middlewares/AdminMiddleware');
const { validateCreateCategory } = require('../validation/CategoryValidation');
// adminMiddleware, validateCreateCategory,
router.post('/create',
    SubCategoryController.createSubCategory)
module.exports = router

