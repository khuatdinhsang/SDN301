const { checkIsEmpty, checkMinLength, checkIsPhoneNumber, checkIsEmail, checkLength, checkIsDate, checkIsBoolean } = require("../index")

const validateRegisterAccount = [
    checkIsEmpty('username', 'username can be not blank'),
    checkMinLength('username', 6, 'username must be at least 6 characters'),
    checkIsEmpty('password', 'password can not be blank'),
    checkMinLength('password', 6, 'password must be at least 6 characters'),
    checkIsEmpty('confirmPassword', 'confirmPassword can not be blank'),
    checkMinLength('confirmPassword', 6, 'confirmPassword must be at least 6 characters'),
]
const validateRegisterUser = [
    checkIsEmail('email', 'email is not valid'),
    checkLength('phone', 10, 10, 'phone must be at least 10 numbers'),
    checkIsDate('dateOfBirth', 'Date of Birth is not valid'),
    checkIsBoolean('gender', 'Gender is not valid'),
]

module.exports = {
    validateRegisterUser, validateRegisterAccount
}