const express = require('express')
const router = express.Router()
const AccountController = require('../controllers/AccountController')
const { validateRegister } = require('../validation/UserValidation');
router.post('/register', validateRegister, AccountController.registerAccount);
router.get('/:id', AccountController.getDetailAccount);
module.exports = router