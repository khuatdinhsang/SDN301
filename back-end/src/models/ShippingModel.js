const mongoose = require('mongoose');
const Category = require("./CategoryModel");

const ShippingSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    startAt: {
        type: Date,
        required: true
    },
    doneAt: {
        type: Date,
        required: true
    },
    canCelAt: {
        type: Date
    },
    cancelReason: {
        type: String,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    }

}, {
    timestamps: true
})
const Shipping = mongoose.model('Shipping', ShippingSchema)
module.exports = Shipping
