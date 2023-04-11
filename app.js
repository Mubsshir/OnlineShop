const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin/admin");
const shopRoutes = require("./routes/shop/shop");
const authRoutes = require("./routes/auth");
const route404 = require("./routes/404");
const csrf=require('csurf');
const flash=require('connect-flash');
const app = express();
const {store,session}=require('./util/sessionStore')


//Initialize csurf protection
const csrfProtection=csrf();
// set template engine
app.set("view engine", "pug");
//set user session
store.sync()
app.use(
  session({
    secret: "hello",  
    resave: false,
    saveUninitialized: false,
    store:store,
  })
);

app.use(flash());

// set request body parser
app.use(bodyParser.urlencoded({ extended: false }));
// set root directory
app.use(express.static(path.join(__dirname, "public")));
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticate=req.session.isAuthenticate
  next();
});
// set routes


app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(route404);

// create server and listen for request
app.listen(3000);
