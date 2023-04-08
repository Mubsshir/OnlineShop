const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin");
const isAuth = require("../../middleware/is-auth");
// /admin/add-product => GET
router.get("/add-product", isAuth,adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product",isAuth, adminController.postAddProduct);
router.get("/products", adminController.getAdminProducts);

router.get("/edit-product/:id",isAuth, adminController.getEditProduct);
router.post("/edit-product",isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth,adminController.postDeleteProduct);
module.exports = router;
