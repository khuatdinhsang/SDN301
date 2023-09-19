const Account = require("../models/AccountModel")
const User = require("../models/UserModel")
const LIMIT_USER = 10;
const registerUser = async (userId, data) => {
    const { email, phone, image, dateOfBirth, gender } = data
    return new Promise(async (resolve, reject) => {
        try {
            const createUser = await User.create({
                email,
                phone,
                image,
                dateOfBirth,
                gender,
                accountId: userId
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
const getDetailUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                accountId: userId
            })
                .populate('accountId')
                .populate({
                    path: 'accountId',
                    populate: {
                        path: 'role'
                    }
                })

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
const updateUser = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, phone, image, dateOfBirth, gender } = data
            const user = await User.findOne({
                accountId: userId
            })
                .populate('accountId')
                .populate({
                    path: 'accountId',
                    populate: {
                        path: 'role'
                    }
                })

            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: `The user is not defined `
                })
            }
            const userUpdate = {
                ...user._doc,
                email,
                phone, image, dateOfBirth, gender
            }
            await User.findByIdAndUpdate(user._id, userUpdate, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: userUpdate
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllUsers = (page = 1, limit = LIMIT_USER) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalUser = await User.count()
            const allUser = await User.find({})
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: totalUser,
                allUser,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    registerUser, getDetailUser, updateUser, getAllUsers
}