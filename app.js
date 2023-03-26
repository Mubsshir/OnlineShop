const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin/admin");
const shopRoutes = require("./routes/shop/shop");
const authRoutes = require("./routes/auth");
const route404 = require("./routes/404");
const app = express();
const { sql, config } = require("./util/database");
const User = require("./models/user");
const session = require("express-session");
const SessionStore = require("mssql-session-store")(session);

const options = {
  pool: new sql.ConnectionPool(config),
  ttl: 3600,
};

// set template engine
app.set("view engine", "pug");
//set user session
app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: false,
    store: new SessionStore(options),
  })
);
// set request body parser
app.use(bodyParser.urlencoded({ extended: false }));
// set root directory
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, res, next) => {
  //const user=await User.FindById(3);
  req.user = { UserID: 3, name: "mubasshir", email: "mmk3045@gmail.com" };
  next();
});
// set routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(route404);

// create server and listen for request
app.listen(3000);
