const express = require('express')
const router = express.Router()
const SubCategoryController = require('../controllers/SubCategoryController');
const { adminMiddleware } = require('../middlewares/AdminMiddleware');
const { validateCreateSubCategory } = require('../validation/SubCategoryValidation');
router.post('/create/:id',
    adminMiddleware, validateCreateSubCategory,
    SubCategoryController.createSubCategory)
router.put('/update/:id', adminMiddleware, validateCreateSubCategory, SubCategoryController.updateSubCategory)
router.get('/getAll', SubCategoryController.getAllSubCategory)
router.put('/getByCategoryId', SubCategoryController.getAllSubCategoryByCategoryId)
router.delete('/delete/:id', SubCategoryController.deleteSubCategory)
router.get('/:id', SubCategoryController.getDetailSubCategory)
module.exports = router

