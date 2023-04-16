const User = require("../models/user");
const { store } = require("../util/sessionStore");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator/check");
const nodeMailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const transporter = nodeMailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "My Key",
    },
  })
);
exports.getLogin = (req, res) => {
  if (!req.session.isAuthenticate) {
    loginError = req.flash("error")[0];
    signupSuccess = req.flash("success")[0];
    return res.render("auth/auth", {
      docTitle: "Login",
      path: "/login",
      loginError,
      signupSuccess,
    });
  }
  res.redirect("/");
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
    if (isCorrectPass) {
      console.log(isUser);
      req.session.isAuthenticate = true;
      req.session.user = isUser.userID;
      req.session.save((err) => {
        if (!err) {
          res.redirect("/");
        }
      });
      return;
    }
  }
  req.session.isAuthenticate = false;
  req.session.save((err) => {
    if (!err) {
      req.flash("error", "Invalid Email/Password");
      res.redirect("/login");
    }
  });
};

exports.postSignup = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const cpwd = req.body.cpwd;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(422).render("auth/signup", {
      docTitle: "SignUp",
      error: true,
      msg: err[0].msg,
      path: "/login",
      values: [email, pass, cpwd],
    });
  }
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
  const sessionId = req.session.id;
  console.log(sessionId);
  if (sessionId) {
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

exports.getReset = (req, res) => {
  inValidEmail = req.flash("error")[0];
  validEmail = req.flash("success")[0];
  return res.render("auth/reset", {
    docTitle: "Reset Password",
    path: "/reset",
    inValidEmail,
    validEmail,
  });
};

exports.postReset = async (req, res) => {
  const email = req.body.email;
  const result = await User.FindByEmail(email, true);
  if (result === true) {
    //send link
    crypto.randomBytes(32, async (err, buffur) => {
      if (err) {
        console.log(err);
        return res.redirect("/reset");
      }
      const token = buffur.toString("hex");
      const expireTime = Date.now() + 3600000;
      const isTokenInserted = await User.SaveResetToken(
        email,
        token,
        expireTime.toString()
      );
      if (isTokenInserted === true) {
        console.log("Sending Mail to : "+email)
        console.log("http://localhost:3000/reset/"+token)
        //send mail
        await transporter.sendMail({
          to: email,
          from: "kmubsshir@hotmail.com",
          subject: "Reset Password Khan Shop",
          html: `
            <h3>Hi User</h3>
            <p>You can reset your password by clicking on following button</p>
            <a href="http://localhost:3000/reset/${token}">Reset Password </a>
          `,
        });
        req.flash(
          "success",
          "Email Reset link sent successfully , chekc you mailbox"
        );
        return res.redirect("/reset");
      }
      //insert token failed try after some time
      req.flash("error", "Failed Contact Administrator");
      return res.redirect("/reset");
    });
  } else {
    req.flash("error", "Email is not registered with us");
    res.redirect("/reset");
  }
};

exports.getNewPassword = async (req, res) => {
  const token = req.params.token;
  const user = await User.FindByToken(token, Date.now());
  if (user.length > 0) {
    const userID = user[0].UserID;
    res.render("auth/newPassword", {
      docTitle: "Set New Password",
      userID,
      token,
    });
  } else {
    req.flash(
      "error",
      "Token Invalid/Expire, Enter email again to generate a new link"
    );
    res.redirect("/reset");
  }
};

exports.postNewPassword = async (req, res) => {
  const user = req.body.userID;
  const pass = req.body.password;
  const token = req.body.token;
  if (pass != "" && pass.length >= 6) {
    const cryptPass = await bcrypt.hash(pass, 12);
    const isPasswordReset = await User.ResetPassword(
      user,
      token,
      Date.now(),
      cryptPass
    );
    if (isPasswordReset) {
      req.flash(
        "success",
        "Password Reset Successfully , Please login again with new password"
      );
      res.redirect("/login");
    } else {
      req.flash(
        "error",
        "Token Invalid/Expire, Enter email again to generate a new link"
      );
      res.redirect("/reset");
    }
  } else {
    return res.render("auth/newPassword", {
      docTitle: "Set New Password",
      user,
      inValidPassword: "Password is not valid it should be 6 characters long",
    });
  }
};
