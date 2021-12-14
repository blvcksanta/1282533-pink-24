var navMain = document.querySelector('.nav__list');
var navToggle = document.querySelector('.nav__button');
var navLogo = document.querySelector('.page-header__content');
var navBurger = document.querySelector('.nav__burger');
var navBurgerClose = document.querySelector('.nav__burger--close');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('nav__list--disable')) {
    navMain.classList.remove('nav__list--disable');
  } else {
    navMain.classList.add('nav__list--disable');
  }
  if (navLogo.classList.contains('page-header__content--active')) {
    navLogo.classList.remove('page-header__content--active');
  } else {
    navLogo.classList.add('page-header__content--active');
  }
  if (navBurger.classList.contains('nav__burger--disable')) {
    navBurger.classList.remove('nav__burger--disable');
  } else {
    navBurger.classList.add('nav__burger--disable');
  }
  if (navBurgerClose.classList.contains('nav__burger--disable')) {
    navBurgerClose.classList.remove('nav__burger--disable');
  } else {
    navBurgerClose.classList.add('nav__burger--disable');
  }
});
