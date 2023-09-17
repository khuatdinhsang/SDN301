const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
const Category = mongoose.model('Category', categorySchema)
module.exports = Category
