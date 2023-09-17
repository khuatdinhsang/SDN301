const mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
    },
    description: {
        type: String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        defaultValue: 1
    }

}, {
    timestamps: true
})
const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = SubCategory
