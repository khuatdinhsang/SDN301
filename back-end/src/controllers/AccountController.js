const { body, validationResult } = require('express-validator');
const AccountServices = require('../services/AccountServices')
const JwtServices = require('../services/JwtServices')

const registerAccount = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The password is not equal confirmPassword'
            })
        }
        const response = await AccountServices.registerAccount(req.body)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const loginAccount = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await AccountServices.loginAccount(req.body)
        const { refreshToken, ...newResponse } = response
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // chi lay dc qua http k lay dc qua js
            secure: false,// khi nao deloy se chuyen thanh true
            samesite: 'strict'
        })
        return res.status(200).json(newResponse)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getDetailAccount = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await AccountServices.getDetailAccount(userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllAccount = async (req, res) => {
    try {
        const { page, limit } = req.query
        const response = await AccountServices.getAllAccount(page, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deActiveAccount = async (req, res) => {
    const userId = req.params.id;
    const { deActiveAt, deActiveReason } = req.body
    try {
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await AccountServices.deActiveAccount(userId, deActiveAt, deActiveReason)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const inActiveAccount = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await AccountServices.inActiveAccount(userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const changePassword = async (req, res) => {
    const { username, newPassword } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await AccountServices.changePassword(username, newPassword)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtServices.refreshTokenServices(token)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    registerAccount, getDetailAccount,
    loginAccount, logout, deActiveAccount,
    inActiveAccount, changePassword, getAllAccount, refreshToken

}