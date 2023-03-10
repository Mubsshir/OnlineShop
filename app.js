const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin/admin");
const shopRoutes = require("./routes/shop/shop");
const authRoutes=require('./routes/auth')
const route404=require('./routes/404')
const app = express();
const db=require('./util/database')
const User=require('./models/user')
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(async (req,res,next)=>{
  const user=await User.FindById(3);
  req.user=user;
  next();
})
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)
app.use(route404);

app.listen(3000);

