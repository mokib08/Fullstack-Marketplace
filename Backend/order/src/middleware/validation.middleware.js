
const { body, validationResult } = require('express-validator')


const respondWithValidationError = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() })
    }
    next();
}


const createOrderValidation = [
    body('shippingAddress.street')
        .isString()
        .withMessage('Street must be a string')
        .notEmpty()
        .withMessage('Street is required'),
    body('shippingAddress.city')
        .isString()
        .withMessage('City must be a string')
        .notEmpty()
        .withMessage('City is required'),
    body('shippingAddress.state')
        .isString()
        .withMessage('State must be a string')
        .notEmpty()
        .withMessage('State is required'),
    body('shippingAddress.pincode')
        .isString()
        .withMessage('Pincode must be a string')
        .notEmpty()
        .withMessage('Pincode is required')
        .bail()
        .matches(/^\d{4,}$/)
        .withMessage('Pincode must be at least 4 digits'),
    body('shippingAddress.country')
        .isString()
        .withMessage('Country must be a string')
        .notEmpty()
        .withMessage('Country is required'),
    respondWithValidationError
]


const updateOrderAddressValidation = [
    body('shippingAddress.street')
        .isString()
        .withMessage('Street must be a string')
        .notEmpty()
        .withMessage('Street can not be empty'),,
    body('shippingAddress.city')
        .isString()
        .withMessage('City must be a string')
        .notEmpty()
        .withMessage('City cannot be empty'),
    body('shippingAddress.state')
        .isString()
        .withMessage('State must be a string')
        .notEmpty()
        .withMessage('State cannot be empty'),
    body('shippingAddress.pincode')
        .isString()
        .withMessage('Pincode must be a string')
        .notEmpty()
        .withMessage('Pincode cannot be empty')
        .bail()
        .matches(/^\d{4,}$/)
        .withMessage('Pincode must be at least 4 digits'),
    body('shippingAddress.country')
        .isString()
        .withMessage('Country must be a string')
        .notEmpty()
        .withMessage('Country can not be empty'),
    respondWithValidationError
]


module.exports = {
    createOrderValidation, 
    updateOrderAddressValidation
}