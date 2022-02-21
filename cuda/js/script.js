const forms__input = document.querySelectorAll('.forms__input');
const forms__span = document.querySelectorAll('.forms__span');
for(let i = 0; i < forms__input.length; i++){
    forms__input[i].addEventListener('input', function(){
      forms__span[i].style.display = ( this.value == "" ) ? 'inline' : 'none';
    });
  }
const hamburger = document.querySelector('.header__hamburger'),
    headerNav = document.querySelector('.header__nav_list'),
    headerLink = document.querySelectorAll('.header__nav_link'),
    headerTitle = document.querySelector('.header__title'),
    headerBtn = document.querySelector('.header__btn');
function toggles() {
    headerNav.classList.toggle('_active');
    headerTitle.classList.toggle('_noactive');
    headerBtn.classList.toggle('_noactive');
  }
hamburger.addEventListener('click', toggles);
headerLink.forEach(item => {
    item.addEventListener('click', toggles);
});
const tabs = document.querySelectorAll('[data-tabs]'),
    section = document.querySelectorAll('[data-section]');

function hidingElem(item) {
    item.style.display = 'none';
}
function noActiveElem(item) {
    item.classList.remove('active');
}
function activeElem(item) {
    item.classList.add('active');
}
tabs[0].addEventListener('click', () => {
    section.forEach(item => {
        item.style.display = 'block';
    });
    if (tabs[1].classList.contains('active') || tabs[2].classList.contains('active') || tabs[3].classList.contains('active')) {
        tabs.forEach(item => noActiveElem(item));
    }
    activeElem(tabs[0]);
});
tabs[1].addEventListener('click', () => {
    if (tabs[1].classList.contains('active') || tabs[2].classList.contains('active') || tabs[3].classList.contains('active')) {
        tabs.forEach(item => noActiveElem(item));
    }
    if (section[2].style.display = 'none' ) {
        section[2].style.display = 'block';
    } 
    if (section[1].style.display = 'none') {
        section[1].style.display = 'block';
     }
    hidingElem(section[3]);
    noActiveElem(tabs[0]);
    activeElem(tabs[1]);
});
tabs[2].addEventListener('click', () => {
    if (tabs[1].classList.contains('active') || tabs[2].classList.contains('active') || tabs[3].classList.contains('active')) {
        tabs.forEach(item => {
            noActiveElem(item);
        })
    }
    if (section[1].style.display = 'none') { 
        section[1].style.display = 'block';
    }
    noActiveElem(tabs[0]);
    tabs[2].classList.add('active');
    hidingElem(section[2]);
    hidingElem(section[3]);
});
tabs[3].addEventListener('click', () => {
    noActiveElem(tabs[0]);
    noActiveElem(tabs[1]);
    noActiveElem(tabs[2]);
    activeElem(tabs[3]);
    hidingElem(section[1]);
    hidingElem(section[2]);
    hidingElem(section[3]);
});
$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn();
        }   else {
            $('.pageup').fadeOut();
        }
    });
    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
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