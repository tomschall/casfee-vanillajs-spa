(function () {
  const burger = document.querySelector('.burger i');
  const nav = document.querySelector('.nav');

  const toggleNav = () => {
    burger.classList.toggle('fa-times');
    burger.classList.toggle('fa-bars');
    nav.classList.toggle('nav-active');
  };

  burger.addEventListener('click', function () {
    toggleNav();
  });

  nav.addEventListener('click', function () {
    toggleNav();
  });

  window.onhashchange = (e) => {
    e.stopPropagation();
    burger.classList.contains('fa-times') ? toggleNav() : '';
  };
})();
