const express = require('express')
const router = express.Router()
const { userMiddleware, adminMiddleware, userMiddlewareByBody, authUserMiddlewareByBody } = require('../middlewares/AdminMiddleware');
const FeedbackController = require('../controllers/FeedbackController');
const { checkIsNumber } = require('../validation');
router.post('/create/', userMiddlewareByBody,
    [checkIsNumber('rate', 'rate must be a number')],
    FeedbackController.feedbackProduct)
router.put('/update/:id', userMiddlewareByBody,
    [checkIsNumber('rate', 'rate must be a number')],
    FeedbackController.updateFeedbackProduct)
router.delete('/delete/:id', authUserMiddlewareByBody, FeedbackController.deleteFeedbackProduct)
router.get('/getAll', FeedbackController.getAllFeedbackProduct)
router.put('/getByProductId', FeedbackController.getAllFeedbackByProductId)
router.put('/getByAccountId', authUserMiddlewareByBody, FeedbackController.getAllFeedbackByAccountId)
router.get('/:id', FeedbackController.getDetailFeedbackProduct)
module.exports = router

