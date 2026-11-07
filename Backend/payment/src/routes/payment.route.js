const express = require('express')
const paymentControllre = require('../controllers/payment.controller')
const createAuthMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.post("/create/:orderId", createAuthMiddleware(['user']),  paymentControllre.createPayment)

router.post('/verify', createAuthMiddleware(['user']), paymentControllre.verifyPayment )

module.exports = router