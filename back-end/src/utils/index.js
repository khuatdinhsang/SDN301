const Feedback = require("../models/FeedbackModel")

const getAverageRateByProduct = async (productId) => {
    const numberRate = await Feedback.count({
        productId
    })
    const averageRate = await Feedback.aggregate([
        {
            $match: {
                productId: productId,
            },
        },
        {
            $group: {
                _id: productId,
                total: { $sum: '$rate' },
            },
        },
    ])
    console.log(averageRate)
    return Number((averageRate[0]?.total / numberRate).toFixed(1))
}

const getAverageRateByAccount = async (accountId) => {
    const numberRate = await Feedback.count({
        accountId
    })
    const averageRate = await Feedback.aggregate([
        {
            $match: {
                accountId: accountId,
            },
        },
        {
            $group: {
                _id: accountId,
                total: { $sum: '$rate' },
            },
        },
    ])
    return Number((averageRate[0]?.total / numberRate).toFixed(1))
}
module.exports = { getAverageRateByProduct, getAverageRateByAccount }