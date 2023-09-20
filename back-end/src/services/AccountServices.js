const Account = require("../models/AccountModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtServices");
const Product = require("../models/ProductModel");
const LIMIT_ACCOUNT = 10;
const registerAccount = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { username, password, confirmPassword } = newUser
        try {
            const checkExistUser = await Account.findOne({
                username
            })
            if (checkExistUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Username already exists!'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            if (!checkExistUser) {
                const createUser = await Account.create({
                    username,
                    password: hash
                })
                const newUser = {
                    ...createUser._doc,
                    password: '******'
                }
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: newUser
                })
            }

        } catch (err) {
            reject(err)
        }

    })
}

const loginAccount = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = userLogin
        try {
            const checkUser = await Account.findOne({
                username
            })
                .populate('role')
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password  is incorrect',
                })
            }
            const accessToken = await generalAccessToken({
                id: checkUser?._id,
                roleId: checkUser?.role?.roleId,
                roleName: checkUser?.role?.roleName
            })
            const refreshToken = await generalRefreshToken({
                id: checkUser?._id,
                roleId: checkUser?.role?.roleId,
                roleName: checkUser?.role?.roleName
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                accessToken, refreshToken
            })
        } catch (e) {
            reject(e)
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
            const newUser = {
                ...createUser._doc,
                password: '******'
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newUser
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllAccount = (page = 1, limit = LIMIT_ACCOUNT) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalAccount = await Account.count()
            const allAccount = await Account.find({})
                .skip(skipNumber)
                .limit(limit)
                .populate('role')
            const newAccount = allAccount.map((account) => {
                return { ...account._doc, password: '******' }
            })
            resolve({
                status: 'OK',
                data: newAccount,
                totalAccount,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const deActiveAccount = (userId, deActiveAt, deActiveReason) => {
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
            const userDeActive = {
                ...user._doc,
                isActive: false,
                deActiveAt,
                deActiveReason,
            }
            const accountDisabled = await Account.findByIdAndUpdate(userId, userDeActive, { new: true })
            const newAccountDisabled = {
                ...accountDisabled._doc,
                password: '******'
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newAccountDisabled
            })
        } catch (err) {
            reject(err)
        }
    })
}
const inActiveAccount = (userId) => {
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
            const userInActive = {
                ...user._doc,
                isActive: true,
                deActiveAt: '',
                deActiveReason: ''
            }

            const accountActive = await Account.findByIdAndUpdate(userId, userInActive, { new: true })
            const newAccountActive = {
                ...accountActive._doc,
                password: '******'
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newAccountActive
            })
        } catch (err) {
            reject(err)
        }
    })
}
const changePassword = (accountId, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Account.findOne({
                _id: accountId
            })
                .populate('role')
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const hash = bcrypt.hashSync(newPassword, 10)
            const userChangePass = {
                ...user._doc,
                password: hash
            }
            const userChangePassword = await Account.findByIdAndUpdate(user._id, userChangePass, { new: true })
            const newUserChangePassword = {
                ...userChangePassword._doc,
                password: '******'
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: newUserChangePassword
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    registerAccount, getDetailAccount,
    loginAccount, deActiveAccount,
    inActiveAccount, changePassword, getAllAccount
}
