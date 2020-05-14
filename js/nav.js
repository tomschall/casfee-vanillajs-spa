// Selection of HTML objects
const burger = document.querySelector('.burger i');
const nav = document.querySelector('.nav');

// Defining a function
const toggleNav = () => {
  burger.classList.toggle('fa-times');
  burger.classList.toggle('fa-bars');

  nav.classList.toggle('nav-active');
};

// Calling the function after click event occurs
burger.addEventListener('click', function () {
  toggleNav();
});
