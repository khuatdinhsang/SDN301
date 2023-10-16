const AdminServices = require('../services/AdminServices');
const totalOrder = async (req, res) => {
    try {
        const { time, number } = req.query;
        const response = await AdminServices.totalOrder(time, number);
        return res.status(201).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}


module.exports = {
    totalOrder
}