const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
const AddressShipping = require('../models/AddressShippingModel');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

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
  sendEmailCreateOrder
}