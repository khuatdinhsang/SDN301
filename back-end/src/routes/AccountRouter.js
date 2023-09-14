const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/AccountController')
const { validateRegister } = require('../validation/UserValidation');
const { checkIsEmpty, checkMinLength } = require('../validation');
router.post('/register', validateRegister, AccountController.registerAccount);
router.post('/login', AccountController.loginAccount);
router.post('/logout', AccountController.logout);
router.get('/getAll', AccountController.getAllAccount)
router.get('/:id', AccountController.getDetailAccount);
router.put('/deActive/:id', AccountController.deActiveAccount)
router.put('/inActive/:id', AccountController.inActiveAccount)
router.put('/changePassword', [
    checkIsEmpty('newPassword', 'password can not be blank'),
    checkMinLength('newPassword', 6, 'password must be at least 6 characters'),
]
    , AccountController.changePassword)
module.exports = router