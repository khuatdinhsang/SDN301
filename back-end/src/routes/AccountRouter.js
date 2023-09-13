const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/AccountController')
const { validateRegister } = require('../validation/UserValidation');
router.post('/register', validateRegister, AccountController.registerAccount);
router.post('/login', AccountController.loginAccount);
router.post('/logout', AccountController.logout);
router.get('/:id', AccountController.getDetailAccount);
router.post('/deActive/:id', AccountController.deActiveAccount)
router.post('/inActive/:id', AccountController.inActiveAccount)
module.exports = router