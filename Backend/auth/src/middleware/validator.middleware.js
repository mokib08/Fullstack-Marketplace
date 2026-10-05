
const {body, validationResult } = require('express-validator')





const respondWithValidationError = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next();
}



const registerUserValidations = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .isLength({min : 3})
        .withMessage('Username must be at least 3 characters long'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .isLength({min : 6})
        .withMessage('Password must be at least 6 characters long'),

    body('fullName.firstName')
        .isString()
        .withMessage('First name must be a String')
        .notEmpty()
        .withMessage('First name is required'),
    body('fullName.lastName')
        .isString()
        .withMessage('Last name must be a String')
        .notEmpty()
        .withMessage('Last name is required'),

    respondWithValidationError
]



module.exports = {
    registerUserValidations
}