const mongoose = require('mongoose');
const SubCategory = require("./SubCategoryModel");
const OrderSchema = new mongoose.Schema({
    addressShippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddressShipping',
        required: true,
    },
    cart: {
        type: Array,
        default: []
    },
    totalPrice: {
        type: Number,
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    isCancel: {
        type: Boolean,
        default: false
    },
    reasonCancel: {
        type: String,
    }

}, {
    timestamps: true
})
const Order = mongoose.model('Order', OrderSchema)
module.exports = Order
