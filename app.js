const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin/admin");
const shopRoutes = require("./routes/shop/shop");
const route404=require('./routes/404')
const app = express();
const db=require('./util/database')
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));



app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(route404);

app.listen(3000);

