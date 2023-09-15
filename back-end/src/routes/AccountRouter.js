const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/AccountController')
const { validateRegisterAccount } = require('../validation/UserValidation');
const { checkIsEmpty, checkMinLength } = require('../validation');
const { adminMiddleware, authUserMiddleware, userMiddleware } = require('../middlewares/AdminMiddleware');
router.post('/register', validateRegisterAccount, AccountController.registerAccount);
router.post('/login', AccountController.loginAccount);
router.post('/logout', AccountController.logout);
router.get('/getAll', adminMiddleware, AccountController.getAllAccount)
router.get('/:id', authUserMiddleware, AccountController.getDetailAccount);
router.put('/deActive/:id', adminMiddleware, AccountController.deActiveAccount)
router.put('/inActive/:id', adminMiddleware, AccountController.inActiveAccount)
router.put('/changePassword', [
    checkIsEmpty('newPassword', 'password can not be blank'),
    checkMinLength('newPassword', 6, 'password must be at least 6 characters'),
], userMiddleware
    , AccountController.changePassword)

module.exports = router
