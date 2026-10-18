const express =  require('express');
const createAuthMiddleware = require('../middleware/auth.middleware')
const cartController = require('../controllers/cart.controller')

const router = express.Router();

router.get('/',
    createAuthMiddleware([ 'user' ]),
    cartController.getCart
)

router.post('/items', 
    createAuthMiddleware(['user']),
    cartController.addItemToCart
);

router.patch(
    '/items/:productId',
    createAuthMiddleware([ 'user' ]),
    cartController.updateItemQuantity
)

module.exports = router;
