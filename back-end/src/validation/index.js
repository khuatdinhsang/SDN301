
const { body, validationResult } = require('express-validator');
const checkIsEmpty = (param, message) => body(param).notEmpty().withMessage(message);
const checkLength = (param, min, max, message) => body(param).isLength({ min: min, max: max }).withMessage(message);
const checkMinLength = (param, min, message) => body(param).isLength({ min: min }).withMessage(message);
const checkMaxLength = (param, max, message) => body(param).isLength({ max: max }).withMessage(message);
const checkIsEmail = (param, message) => body(param).isEmail().withMessage(message);
const checkIsString = (param, message) => body(param).isString().withMessage(message);
const checkIsNumber = (param, message) => body(param).isNumeric().withMessage(message);
const checkIsBoolean = (param, message) => body(param).isBoolean().withMessage(message);
const checkIsDate = (param, message) => body(param).isDate().withMessage(message);
module.exports = {
    checkIsEmpty, checkLength, checkMaxLength, checkMinLength
}
