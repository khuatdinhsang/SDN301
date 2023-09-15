const Account = require("../models/AccountModel")
const User = require("../models/UserModel")

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
            console.log("84", userUpdate)
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
const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find({})
            resolve({
                status: 'OK',
                data: allUser
            })
        } catch (err) {
            reject(err)
        }
    })
}
module.exports = {
    registerUser, getDetailUser, updateUser, getAllUsers
}