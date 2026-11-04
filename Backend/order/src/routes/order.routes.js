
const express = require('express')
const createAuthMiddleware = require('../middleware/auth.middleware')
const validation = require('../middleware/validation.middleware')
const orderController = require('../controllers/order.controller')

const router = express.Router()


router.post("/", createAuthMiddleware(["user"]),validation.createOrderValidation, orderController.createOrder )



module.exports = router