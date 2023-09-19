const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    rate: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: true
    },
    numberSold: {
        type: Number,
    },
    numberDiscount: {
        type: Number,
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    categoryId: {
        type: String,
    },
    feedback: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account'
        },
        content: String,
        timeAt: Date
    }]
}, {
    timestamps: true
})
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
