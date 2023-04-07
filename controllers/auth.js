const User = require("../models/user");
const { store } = require("../util/sessionStore");
const bcrypt = require("bcryptjs");
exports.getLogin = (req, res) => {
  res.render("auth/auth", {
    docTitle: "Login",
    path: "/login",
    isAuthenticate: req.session.isAuthenticate,
  });
};
exports.getSignup = (req, res) => {
  if (req.session.isAuthenticate) {
    res.redirect("/");
  }
  res.render("auth/signup", {
    docTitle: "SignUp",
  });
};

exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const isUser = await User.fetchUserPass(email);
  if (isUser.result) {
    const isCorrectPass = await bcrypt.compare(pass, isUser.result);
    if(isCorrectPass){
      req.session.isAuthenticate = true;
      req.session.save((err) => {
        if (!err) {
          res.redirect("/");
        }
      });
      
    }
  }
  req.session.isAuthenticate = false;
    req.session.save((err) => {
      if (!err) {
        res.redirect("/login");
      }
    });
};

exports.postSignup = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const cpwd = req.body.cpwd;
  if (pass === cpwd) {
    const existingUser = await User.FindByEmail(email);
    if (existingUser) {
      console.log("user already existed");
      res.render("auth/signup", {
        docTitle: "SignUp",
        error: true,
        msg: "User with this email Already Existed",
        path: "/login",
        values: [email, pass, cpwd],
      });
    } else {
      const cryptPass = await bcrypt.hash(pass, 12);
      const user = new User(email, cryptPass);
      await user.save();
      res.redirect("/login");
    }
  } else {
    res.render("auth/signup", {
      docTitle: "SignUp",
      error: true,
      msg: "Password mis-matched check again",
      path: "/login",
      values: [email, pass, cpwd],
    });
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
        res.redirect("/login");
      });
    });
  } else {
    res.redirect("/");
  }
};
