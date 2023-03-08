const express = require('express');
const router=express.Router();
const controller404=require('../controllers/404')
router.use(controller404.get404page)

module.exports=router;