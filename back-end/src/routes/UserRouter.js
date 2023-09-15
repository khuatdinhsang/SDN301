const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController');
const { userMiddleware, adminMiddleware } = require('../middlewares/AdminMiddleware');
const { validateRegisterUser } = require('../validation/UserValidation');
router.post('/register/:id', userMiddleware, validateRegisterUser, UserController.registerUser);
router.get('/:id', userMiddleware, UserController.getDetailUser)
router.put('/update/:id', userMiddleware, validateRegisterUser, UserController.updateUser)
router.get('/getAll', adminMiddleware, UserController.getAllUsers)
module.exports = router

