
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
        .withMessage('street is required'),
    body('shippingAddress.city')
        .isString()
        .withMessage('city must be a string')
        .notEmpty()
        .withMessage('City is required'),
    body('shippingAddress.state')
        .isString()
        .withMessage('State must be a string')
        .notEmpty()
        .withMessage('state is required'),
    body('shippingAddress.pincode')
        .isString()
        .withMessage('Pincode must be a string')
        .notEmpty()
        .withMessage('Pincode is required')
        .bail()
        .matches(/^\d{4,}$/)
        .withMessage('Pincode must be at least 4 digit'),
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
        .withMessage('street can not be empty'),,
    body('shippingAddress.city')
        .isString()
        .withMessage('City must be a string')
        .notEmpty()
        .withMessage('City can not be empty'),
    body('shippingAddress.state')
        .isString()
        .withMessage('State must be a string')
        .notEmpty()
        .withMessage('State can not be empty'),
    body('shippingAddress.pincode')
        .isString()
        .withMessage('Pincode must be a string')
        .notEmpty()
        .withMessage('Pincode can not be empty')
        .bail()
        .matches(/^\d{4,}$/)
        .withMessage('Pincode must be at least 4 digit'),
    body('shippingAddress.country')
        .isString()
        .withMessage('Country must be a string')
        .notEmpty()
        .withMessage('Country can not be empty')
]


module.exports = {createOrderValidation, updateOrderAddressValidation}