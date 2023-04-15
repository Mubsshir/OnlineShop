const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");
const isAuth = require("../middleware/is-auth");
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);
router.get("/signup", authController.getSignup);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token",authController.getNewPassword)
router.post("/setpass",authController.postNewPassword)
router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Email is Invalid , Please Enter a correct email address"),
  authController.postSignup
);

module.exports = router;
