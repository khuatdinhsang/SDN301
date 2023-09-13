const { body, validationResult } = require('express-validator');
const AccountServices = require('../services/AccountServices')

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
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

module.exports = {
    registerAccount, getDetailAccount
}