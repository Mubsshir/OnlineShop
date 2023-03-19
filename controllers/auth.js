const User = require("../models/user");

exports.getLogin=(req,res)=>{
  const isLoggedIn=req.get('Cookie').split('=')[1]==='true'
  res.render('auth/auth',{
    docTitle:'Login',
    path:'/login',
    isAuthenticate:isLoggedIn
  })
}
exports.postLogin=async (req,res)=>{
  const name=req.body.user;
  const email=req.body.email;
  const user=new User(name,email);
  req.isLoggedIn=true;  
  await user.save();
  res.setHeader('Set-Cookie','isLoggedIn=true')
  res.redirect('/');
}