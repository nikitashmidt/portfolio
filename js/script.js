document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        closeBtn = document.querySelector('.menu__close'),
        overlay = document.querySelector('.menu__overlay'),
        link = document.querySelector('.menu__list'),
        counters = document.querySelectorAll('.skills__ratings-counter'),
        lines = document.querySelectorAll('.skills__ratings-line span'),
        menuLink = document.querySelectorAll('.menu__link'),
        contactsPolicy = document.querySelector('.contacts__policy'),
        contactsCheckbox = document.querySelector('#contacts__checkbox');
    function addAnimation(item, index, animation) {
        item[index].classList.add('animate__animated', animation, 'animate__delay-0.5s')
    }
    function removeAnimation(item, index, animation) {
        item[index].classList.remove('animate__animated', animation, 'animate__delay-0.5s')
    }
    function closeModal() {
        menu.classList.remove('active');
        document.getElementsByTagName('html')[0].style.overflow = '';
        hamburger.classList.remove('hamburger_active');
        removeAnimation(menuLink, 0, 'animate__fadeInRight');        
        removeAnimation(menuLink, 1, 'animate__fadeInLeft');
        removeAnimation(menuLink, 2, 'animate__fadeInRight');        
        removeAnimation(menuLink, 3, 'animate__fadeInLeft');
        removeAnimation(menuLink, 4, 'animate__fadeInRight');
    }
    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        hamburger.classList.add('hamburger_active');
        addAnimation(menuLink, 0, 'animate__fadeInRight');        
        addAnimation(menuLink, 1, 'animate__fadeInLeft');
        addAnimation(menuLink, 2, 'animate__fadeInRight');
        addAnimation(menuLink, 3, 'animate__fadeInLeft');
        addAnimation(menuLink, 4, 'animate__fadeInRight');
    });
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    link.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && menu.classList.contains('active')) {
            closeModal();
        }
    });
    counters.forEach((item, i) => {
        lines[i].style.width = item.innerHTML;
    });
    formInput = document.querySelectorAll('.form__input');
    formLabel = document.querySelectorAll('.form__label');
    for (let i = 0; i < formInput.length; i++) {
        formInput[i].addEventListener('input', function(){
            formLabel[i].style.display = ( this.value == "" ) ? 'inline' : 'none';
          });
     }
    $(document).ready(function(){
        $(window).scroll(function(){
            if ($(this).scrollTop() > 1400) {
                $('.pageup').fadeIn();
            }   else {
                $('.pageup').fadeOut();
            }
        });
        $("a[href^='#up']").click(function(){
            const _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });
});
































});