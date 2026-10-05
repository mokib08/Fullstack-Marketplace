
const express = require("express");
const authController = require('../controllers/auth.controller')
const validators = require('../middleware/validator.middleware')

const router = express.Router();

router.post('/register',validators.registerUserValidations, authController.registerUser);

module.exports = router;



