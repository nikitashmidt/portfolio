const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.header__nav'),
    close = document.querySelector('.hamburger__close'),
    overlay = document.querySelector('.overlay'),
    link = document.querySelectorAll('.header__link');


    function toggles() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('hide');
    }
    hamburger.addEventListener('click', () => {
        toggles();
    });
    link.forEach(item => {
        item.addEventListener('click', toggles);
    });
    overlay.addEventListener('click', toggles);
    

    





    $(document).ready(function(){
        $(window).scroll(function(){
            if ($(this).scrollTop() > 1400) {
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