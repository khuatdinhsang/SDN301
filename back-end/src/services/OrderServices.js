const Account = require("../models/AccountModel")
const AddressShipping = require("../models/AddressShippingModel")
const Category = require("../models/CategoryModel")
const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const SubCategory = require("../models/SubCategoryModel")
const { sold, reSold } = require("../utils")
const LIMIT_ORDER = 10;
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


const getAllOrderByAccountId = (page, limit = LIMIT_ORDER, accountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalOrderByAccountId = await Order.count({
                accountId
            })
            const allOrderByAccountId = await Order.find({
                accountId
            })
                .populate('addressShippingId')
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allOrderByAccountId,
                totalOrderByAccountId,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllOrder = (page, limit = LIMIT_ORDER) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalOrder = await Order.count()
            const allOrder = await Order.find()
                .populate('addressShippingId')
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allOrder,
                totalOrder,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDetail = await Order.findOne({
                _id: orderId
            })
                .populate('addressShippingId')
            resolve({
                status: 'OK',
                data: orderDetail,
            })
        } catch (err) {
            reject(err)
        }
    })
}
const cancelOrder = (orderId, data) => {
    const { message } = data
    return new Promise(async (resolve, reject) => {
        try {
            const orderExist = await Order.findOne({
                _id: orderId
            })
                .populate('addressShippingId')
            for (i = 0; i < orderExist.cart.length; i++) {
                //update Product
                reSold(orderExist.cart[i].productId, orderExist.cart[i].quantity)
            }
            const orderCancel = await Order.findByIdAndUpdate(orderId, {
                status: false,
                isCancel: true,
                reasonCancel: message
            }, { new: true })
            resolve({
                status: 'OK',
                message: 'Order cancel successfully',
                data: orderCancel
            })
        } catch (err) {
            reject(err)
        }
    })
}
// const reSoldOrder = (orderId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const orderExist = await Order.findOne({
//                 _id: orderId
//             })
//                 .populate('addressShippingId')
//             for (i = 0; i < orderExist.cart.length; i++) {
//                 //update Product
//                 sold(orderExist.cart[i].productId, orderExist.cart[i].quantity)
//             }
//             await Order.findByIdAndUpdate(orderId, {
//                 status: true,
//                 isCancel: false,
//                 reasonCancel: ''
//             },{new:true})
//             resolve({
//                 status: 'OK',
//                 message: 'Resold Order  successfully'
//             })
//         } catch (err) {
//             reject(err)
//         }
//     })
// }

module.exports = {
    createOrder, getAllOrderByAccountId,
    getAllOrder, getDetailOrder, cancelOrder,
}