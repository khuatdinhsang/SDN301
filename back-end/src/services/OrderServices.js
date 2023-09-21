const Account = require("../models/AccountModel")
const AddressShipping = require("../models/AddressShippingModel")
const Category = require("../models/CategoryModel")
const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const SubCategory = require("../models/SubCategoryModel")
const createOrder = (accountId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { customerName, customerPhone, customerAddress } = data;
            var { addressShippingId } = data
            const checkAccountExist = await Account.findOne({
                _id: accountId
            })
            if (!checkAccountExist) {
                resolve({
                    status: 'ERR',
                    message: "Account is not defined"
                })
            }
            const { _id, cart } = checkAccountExist;
            const totalPrice = cart.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.price * currentValue.quantity * (100 - currentValue?.numberDiscount) / 100;
            }, 0)
            if (!addressShippingId) {
                var addressShipping = await AddressShipping.create({
                    customerName,
                    phone: customerPhone,
                    address: customerAddress,
                })
            }
            const newOrder = await Order.create({
                accountId: _id,
                addressShippingId: addressShippingId || addressShipping._id,
                totalPrice: totalPrice,
                cart
            })

            cart.filter(item => {
                return sold(item.productId, item.quantity);
            });
            resolve({
                status: 'OK',
                message: 'Order successfully',
                data: newOrder
            })
        } catch (err) {
            reject(err)
        }
    })
}
const sold = async (id, quantity) => {
    const productExist = await Product.findOne({
        _id: id
    })
    let prod = await Product.findOneAndUpdate({ _id: id }, {
        numberSold: parseInt(productExist?.numberSold + quantity),
        quantity: parseInt(productExist?.quantity - quantity),
    }, { new: true });
    if (prod.quantity === 0) {
        prod = await Product.findOneAndUpdate({ _id: id }, {
            status: false
        }, { new: true });
    }
    return prod;
};
module.exports = { createOrder }