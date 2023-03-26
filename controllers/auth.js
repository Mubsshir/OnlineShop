const User = require("../models/user");

exports.getLogin = (req, res) => {
  res.render("auth/auth", {
    docTitle: "Login",
    path: "/login",
    isAuthenticate: false,
  });
};
exports.postLogin = async (req, res) => {
  const name = req.body.user;
  const email = req.body.email;
  const user = new User(name, email);
  req.session.isAuthenticate = true;
  res.redirect("/");
};
