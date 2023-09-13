const Account = require("../models/AccountModel")
const bcrypt = require("bcrypt")

const registerAccount = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { username, password, confirmPassword } = newUser
        try {
            const checkExistIUser = await Account.findOne({
                username
            })
            if (checkExistIUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Username already exists!'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createUser = await Account.create({
                username,
                password: hash
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: createUser
                })
            }
        } catch (err) {
            reject(err)
        }

    })
}
const getDetailAccount = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Account.findOne({
                _id: userId
            })
                .populate('role')

            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    registerAccount, getDetailAccount
}
