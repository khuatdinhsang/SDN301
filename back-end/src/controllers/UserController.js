const { validationResult } = require('express-validator');
const UserServices = require('../services/UserServices')

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await UserServices.registerUser(req.userId, req.body)
        return res.status(201).json(response)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(404).json({
                status: 'ERR',
                message: "Email already exists"
            })
        }
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailUser = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserServices.getDetailUser(userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserServices.updateUser(userId, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const { page, limit } = req.query
        const response = await UserServices.getAllUsers(page, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
module.exports = {
    registerUser, getDetailUser, updateUser, getAllUsers
}