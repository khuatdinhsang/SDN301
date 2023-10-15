const Message = require("../models/MessageModel");
const Account = require("../models/AccountModel");
const createMessage = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {roomId, sender, message} = data;
            const account = await Account.findOne({username: sender});
            if(!account)  resolve({
                status: 'ERR',
                message: 'Account not exist',
            })
            const createMessage = await Message.create({
                text: message,
                sender: account._id,
                room: roomId
            })
            resolve({
                status: 'OK',
                message: 'Message create successfully',
                data: createMessage
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {createMessage};