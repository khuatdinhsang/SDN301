const { validationResult } = require('express-validator');
const OrderServices = require('../services/OrderServices')

const createOrder = async (req, res) => {
    const { customerName, customerPhone, customerAddress } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const accountId = req.user.id
        const response = await OrderServices.createOrder(accountId, req.body)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}

module.exports = {
    createOrder

}