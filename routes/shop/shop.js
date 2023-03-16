const express = require('express');
const router = express.Router();
const productController = require('../../controllers/shop');
router.get('/',productController.getIndex);
router.get('/cart',productController.getCart);
router.post('/cart',productController.postCart);
router.post('/delete-cart',productController.deleteCart)
router.get('/checkout',productController.getCheckout);
router.get('/products',productController.getProducts);
router.post('/products/:productID',productController.getProduct)
router.get('/orders',productController.getOrders)
router.post('/orders',productController.postOrder)
module.exports = router;  