
const { validationResult } = require('express-validator');
const SubCategoryServices = require('../services/SubCategoryServices')
const createSubCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await CategoryServices.createCategory(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
module.exports = {
    createSubCategory,
}