const authController=require('../controllers/auth')
const express = require("express");
const router = express.Router();
const {check}=require('express-validator/check')
router.get('/login',authController.getLogin);
router.post('/login' , authController.postLogin);
router.post('/logout',authController.postLogout);
router.get('/signup',authController.getSignup);
router.post('/signup',check('email').isEmail().withMessage("Email is Invalid , Please Enter a correct email address"),authController.postSignup);


module.exports=router;