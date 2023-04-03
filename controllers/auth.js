const User = require("../models/user");
const { store } = require("../util/sessionStore");

exports.getLogin = (req, res) => {
  res.render("auth/auth", {
    docTitle: "Login",
    path: "/login",
    isAuthenticate: req.session.isAuthenticate,
  });
};
exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const user = new User(name, email);
  req.session.isAuthenticate = true;
  req.session.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
};
exports.postSingup = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const cpwd = req.body.cpwd;
  if (pass === cpwd) {
    const existingUser = await User.FindByEmail(email,false);
    if (existingUser) {
      console.log("user already existed");
    } else {
      const user = new User(email, pass);
      await user.save();
      res.redirect("/login");
    }
  }
};
exports.postLogout = (req, res) => {
  console.log("In post logout");
  const sessionId = req.session.id;
  console.log(sessionId);
  if (sessionId) {
    console.log("Hello");
    store.destroy(sessionId, (err) => {
      if (err) {
        console.error(err);
      }
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
      });
    });
  } else {
    res.redirect("/");
  }
};