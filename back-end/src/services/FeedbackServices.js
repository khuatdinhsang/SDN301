const Account = require("../models/AccountModel")
const Feedback = require("../models/FeedbackModel")
const Product = require("../models/ProductModel")
const LIMIT_FEEDBACK = 10;
const feedbackProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { accountId, productId, content, image, rate } = data
            const checkAccountExists = await Account.findOne({
                _id: accountId
            })
            const checkProductExists = await Product.findOne({
                _id: productId
            })
            if (!checkAccountExists) {
                resolve({
                    status: 'ERR',
                    message: 'Account not found'
                })
            }
            if (!checkProductExists) {
                resolve({
                    status: 'ERR',
                    message: 'Product not found'
                })
            }
            if (checkAccountExists && checkProductExists) {
                const feedbackProduct = await Feedback.create({
                    accountId,
                    productId,
                    content,
                    image,
                    rate,
                    timeAt: Date.now()
                })
                resolve({
                    status: 'OK',
                    message: 'Feedback successfully',
                    data: feedbackProduct
                })
            }

        } catch (err) {
            reject(err)
        }
    })
}

const updateFeedbackProduct = (feedbackProductId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { accountId, productId } = data
            const checkAccountExists = await Account.findOne({
                _id: accountId
            })
            const checkProductExists = await Product.findOne({
                _id: productId
            })
            if (!checkAccountExists) {
                resolve({
                    status: 'ERR',
                    message: 'Account not found'
                })
            }
            if (!checkProductExists) {
                resolve({
                    status: 'ERR',
                    message: 'Product not found'
                })
            }
            if (checkAccountExists && checkProductExists) {
                await Feedback.findByIdAndUpdate(feedbackProductId, data, { new: true })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data
                })
            }
        } catch (err) {
            reject(err)
        }
    })

}
const deleteFeedbackProduct = (feedbackProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Feedback.findByIdAndDelete({
                _id: feedbackProductId
            })
            resolve({
                status: 'OK',
                messages: "Delete Successfully"
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailFeedbackProduct = (feedbackProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const feedbackProduct = await Feedback.findOne({
                _id: feedbackProductId
            })
            if (feedbackProduct === null) {
                resolve({
                    status: 'ERR',
                    message: `The feedbackProduct is not defined `
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: feedbackProduct
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllFeedbackProduct = (page = 1, limit = LIMIT_FEEDBACK) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalFeedback = await Feedback.count()
            const allFeedbackProduct = await Feedback.find({})
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allFeedbackProduct,
                totalFeedback,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllFeedbackByProductId = (page = 1, limit = LIMIT_FEEDBACK, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalFeedbackByProductId = await Feedback.count({
                productId
            })
            const allFeedbackByProductId = await Feedback.find({
                productId
            })
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: allFeedbackByProductId,
                totalFeedbackByProductId,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllFeedbackByAccountId = (page = 1, limit = LIMIT_FEEDBACK, accountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("accountId", accountId)
            var skipNumber = (page - 1) * limit;
            const totalFeedbackByAccountId = await Feedback.count({
                accountId
            })
            const allFeedbackByAccountId = await Feedback.find({
                accountId
            })
                .skip(skipNumber)
                .limit(limit)
            resolve({
                status: 'OK',
                data: totalFeedbackByAccountId,
                allFeedbackByAccountId,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}


module.exports = {
    feedbackProduct, updateFeedbackProduct, deleteFeedbackProduct,
    getDetailFeedbackProduct, getDetailFeedbackProduct,
    getAllFeedbackProduct, getAllFeedbackByProductId, getAllFeedbackByAccountId
}
