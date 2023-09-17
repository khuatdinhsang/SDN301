const { checkIsEmpty, checkMinLength, checkIsPhoneNumber, checkIsEmail, checkLength, checkIsDate, checkIsBoolean } = require("../index")

const validateCreateCategory = [
    checkIsEmpty('name', 'username can be not blank'),
]
module.exports = {
    validateCreateCategory
}