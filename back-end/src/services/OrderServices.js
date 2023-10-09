const Account = require("../models/AccountModel")
const AddressShipping = require("../models/AddressShippingModel")
const Category = require("../models/CategoryModel")
const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const User = require("../models/UserModel")
const SubCategory = require("../models/SubCategoryModel")
const { sold, reSold } = require("../utils")
// send gmail
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

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
            const user = await User.findOne({
                accountId: checkAccountExist._id
            })
            //remove cart 
            await Account.findByIdAndUpdate(accountId, {
                cart: []
            }, { new: true })
            cart.filter(item => {
                return sold(item.productId, item.quantity);
            });

            resolve({
                status: 'OK',
                message: 'Order successfully',
                data: { ...newOrder._doc, email: user.email }
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

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });
    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));
    const address = await AddressShipping.findOne({
        _id: orderItems.addressShippingId
    })
    let listItem = '';
    const attachImage = []
    orderItems?.cart?.forEach((order) => {
        listItem += `<div>
      <div>
        Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.quantity}</b> và giá là: <b>${order.price} VND</b></div>
        <div>Bên dưới là hình ảnh của sản phẩm</div>
      </div>`
        attachImage.push({ path: order.image })
    })
    listItem += ` 
          <div>
                Tổng tiền hàng: <b>${orderItems.totalPrice}</b> 
          </div>
          <div>
              Nguời nhận : <b>${address.customerName}</b>
              SDT : <b>${address.phone}</b>
              Địa chỉ : <b>${address.address}</b>
          </div>
          `
    // send mail with defined transport object
    await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Bạn đã đặt hàng tại shop HolaFood", // Subject line
        text: "Hello ", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công tại shop HolaFood</b></div> ${listItem}`,
        attachments: attachImage,
    });
}

module.exports = {
    createOrder, getAllOrderByAccountId,
    getAllOrder, getDetailOrder, cancelOrder, sendEmailCreateOrder
}