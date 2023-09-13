const { checkIsEmpty, checkMinLength } = require("../index")

const validateRegister = [
    checkIsEmpty('username', 'username can be not blank'),
    checkMinLength('username', 6, 'username must be at least 6 characters'),
    checkIsEmpty('password', 'password can not be blank'),
    checkMinLength('password', 6, 'password must be at least 6 characters'),
    checkIsEmpty('confirmPassword', 'confirmPassword can not be blank'),
    checkMinLength('confirmPassword', 6, 'confirmPassword must be at least 6 characters'),
]

module.exports = {
    validateRegister
}