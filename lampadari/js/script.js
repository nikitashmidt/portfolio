"use strict";
var headerReservation = document.querySelector('.header__reservation'),
    modal = document.querySelector('.modal'),
    overlay = modal.querySelector('.modal__overlay'),
    modalClose = document.querySelector('.modal__wrapper-close'),
    dropDown = document.querySelector('.header__dropdown'),
    azienda = document.querySelector('#azienda'),
    headerItem = document.querySelectorAll('.header__dropdown-item'),
    lampadariArrow = document.querySelector('.lampadari__arrow'),
    lampadariArrowImg = document.querySelector('.lampadari__arrow img'),
    lampadariItems = document.querySelector('.lampadari__items'),
    hamburger = document.querySelector('.header__hamburger'),
    headerMenu = document.querySelector('.header__menu'),
    headerOverlay = document.querySelector('.header__overlay'),
    accediTitle = document.querySelector('.accedi-title'),
    registratiTitle = document.querySelector('.registrati-title'),
    accedi = document.querySelector('.modal__wrapper-accedi'),
    registrati = document.querySelector('.modal__wrapper-registrati');
function removeClass() {
  if (registrati.classList.contains('modal__wrapper-registrati-active') || accedi.classList.contains('modal__wrapper-accedi-active')) {
    removeNoActive();
  } else {
    modal.classList.remove('active');
    enableScroll();
  }
}
var disableScroll = function disableScroll() {
  var paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = paddingOffset;
};
var enableScroll = function enableScroll() {
  document.body.style.paddingRight = 0;
  document.body.style.overflow = '';
};
headerReservation.addEventListener('click', function () {
  modal.classList.add('active');
  disableScroll();
  if (dropDown.classList.contains('header__dropdown-active')) {
    dropDown.classList.remove('header__dropdown-active');
  }
});
document.addEventListener('keydown', function (e) {
  if (e.code === 'Escape' && modal.classList.contains('active')) {
    removeClass();
  }
});
overlay.addEventListener('click', removeClass);
modalClose.addEventListener('click', removeClass);
azienda.addEventListener('click', function () {
  dropDown.classList.toggle('header__dropdown-active');
});

for (var i = 0; i < headerItem.length; i++) {
  headerItem[i].addEventListener('click', function () {
    dropDown.classList.remove('header__dropdown-active');
  });
}
function lampadariArrowToggl() {
  lampadariArrow.classList.toggle('lampadari__arrow-active');
  lampadariItems.classList.toggle('lampadari__items-active');
  lampadariArrowImg.classList.toggle('lampadari__arrow-img-active');
  console.log('helo');
 }
lampadariArrow.addEventListener('click', lampadariArrowToggl);
function toggles() {
  headerMenu.classList.toggle('header__menu-active');
  headerOverlay.classList.toggle('header__overlay-active');
  hamburger.classList.toggle('header__hamburger-active');
  document.body.classList.toggle('overflow');
  if (lampadariItems.classList.contains('lampadari__items-active') &&  lampadariArrow.classList.contains('lampadari__arrow-active')) {
    lampadariArrowToggl()
  } 
}
hamburger.addEventListener('click', toggles);
headerOverlay.addEventListener('click', toggles);
  function classNoActive() {
    accediTitle.classList.add('accedi-title-noactive');
    registratiTitle.classList.add('registrati-title-noactive');
  }
  function removeNoActive() {
    accediTitle.classList.remove('accedi-title-noactive');
    registratiTitle.classList.remove('registrati-title-noactive');
    accedi.classList.remove('modal__wrapper-accedi-active');
    registrati.classList.remove('modal__wrapper-registrati-active');
  }
accediTitle.addEventListener('click', function () {
  accedi.classList.add('modal__wrapper-accedi-active');
  classNoActive();
});
registratiTitle.addEventListener('click', function () {
  registrati.classList.add('modal__wrapper-registrati-active');
  classNoActive();
});


const swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  initialSlide: 1,
  loop: true,
});
$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.pageup').fadeIn();
        }   else {
            $('.pageup').fadeOut();
        }
    });
    $(window).scroll(function(){
        if ($(this).scrollTop() > 0) {
            $('.homepage').fadeOut();
        }   else {
            $('.homepage').fadeIn();
        }
    });
    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});


