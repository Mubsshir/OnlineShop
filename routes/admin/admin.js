const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);
router.get("/products", adminController.getAdminProducts);

router.get("/edit-product/:id", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);
router.post("/delete-product", adminController.postDeleteProduct);
module.exports = router;
