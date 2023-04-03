const signUpBtn = document.querySelector(".sign");
const loginBtn =document.querySelector('.loginLink');
const url=window.location.href;
const loginForm=document.querySelector('.form-control.login');
const signUpForm=document.querySelector('.form-control.signup')
if(url==="http://localhost:3000/login#signupForm"){
  loginForm.style.display='none'
  signUpForm.style.display='block'
}
else if(url==="http://localhost:3000/login#loginForm"){
  signUpForm.style.display='none'
  loginForm.style.display='block'
}

signUpBtn.addEventListener("click", () => {
  loginForm.style.display='none'
  signUpForm.style.display='block'
});

loginBtn.addEventListener("click", () => {
  signUpForm.style.display='none'
  loginForm.style.display='block'
});