module.exports = (req, res, next) => {
  console.log("Is User Authenticated : "+req.session.isAuthenticate)
  if (!req.session.isAuthenticate) {
    return res.redirect("/login");
  }
  next();
};
