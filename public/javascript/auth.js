const signUpBtn = document.querySelector(".sign");
const loginBtn =document.querySelector('.loginLink');

const loginForm=document.querySelector('.form-control.login');
const signUpForm=document.querySelector('.form-control.signup')
console.log(signUpBtn);
signUpBtn.addEventListener("click", () => {
  loginForm.style.display='none'
  signUpForm.style.display='block'
});

loginBtn.addEventListener("click", () => {
  signUpForm.style.display='none'
  loginForm.style.display='block'
});