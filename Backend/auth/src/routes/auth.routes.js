
const express = require("express");
const authController = require('../controllers/auth.controller')
const validators = require('../middleware/validator.middleware')

const router = express.Router();


// POST /auth/register
router.post('/register',validators.registerUserValidations, authController.registerUser);
// POST /auth/login
router.post('/login',validators.loginUserValidations, authController.loginUser);





module.exports = router;



