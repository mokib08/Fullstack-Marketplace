
const express = require('express')
const createAuthMiddleware = require('../middleware/auth.middleware')
const validation = require('../middleware/validation.middleware')
const orderController = require('../controllers/order.controller')

const router = express.Router()


router.post("/", createAuthMiddleware(['user']), validation.createOrderValidation , orderController.createOrder )

router.get('/me', createAuthMiddleware(['user']), orderController.getMyOrders)

router.post("/:id/cancel", createAuthMiddleware(['user']), orderController.cancleOrderById)

router.patch("/:id/address", createAuthMiddleware(["user"]), validation.updateOrderAddressValidation, orderController.updateOrderAddress)

router.get("/:id", createAuthMiddleware(['user', 'admin']), orderController.getOrderById)

module.exports = router