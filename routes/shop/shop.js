const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/is-auth");
const productController = require("../../controllers/shop");

router.get("/", productController.getIndex);
router.get("/cart",isAuth ,productController.getCart);
router.post("/cart", isAuth, productController.postCart);
router.post("/delete-cart", isAuth, productController.deleteCart);
router.get("/checkout", isAuth, productController.getCheckout);
router.get("/products", productController.getProducts);
router.post("/products/:productID", productController.getProduct);
router.get("/orders", isAuth, productController.getOrders);
router.post("/orders", isAuth, productController.postOrder);
module.exports = router;
