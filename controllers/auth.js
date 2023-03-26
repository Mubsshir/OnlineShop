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
  const name = req.body.user;
  const email = req.body.email;
  const user = new User(name, email);
  req.session.isAuthenticate = true;
  req.session.save(err=>{
    if(!err){
      res.redirect('/')
    }
  })
};

exports.postLogout = (req, res) => {
  console.log("In post logout")
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
