const express = require('express');
const multer = require('multer');
const productController = require('../controller/product.controller');
const createAuthMiddleware = require('../middleware/auth.middleware');
const { createProductValidators } = require('../validators/product.validators');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/products
router.post(
    '/',
    createAuthMiddleware([ 'seller' ]),
    upload.array('images', 5),
    createProductValidators,
    productController.createProduct
);

// GET /api/products
router.get('/', productController.getProduct)

// PATCH /api/products
router.patch('/:id', createAuthMiddleware(['seller']), productController.updateProduct)

// DELETE /api/product/:id
router.delete('/:id', createAuthMiddleware(['seller']), productController.deleteProduct)

// GET /api/product/:id
router.get('/seller', createAuthMiddleware(['seller']), productController.getProductsSeller)

// GET /api/products/:id
router.get('/:id', productController.getProductById)


module.exports = router;