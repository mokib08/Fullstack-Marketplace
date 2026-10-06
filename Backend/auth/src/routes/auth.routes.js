
const express = require("express");
const authController = require('../controllers/auth.controller')
const validators = require('../middleware/validator.middleware');
const authMiddleware  = require("../middleware/auth.middleware");

const router = express.Router();


// POST /auth/register
router.post('/register',validators.registerUserValidations, authController.registerUser);
// POST /auth/login
router.post('/login',validators.loginUserValidations, authController.loginUser);

// POST /auth/me
router.get('/me', authMiddleware.authMiddleware, authController.getCurrentUser)


module.exports = router;



