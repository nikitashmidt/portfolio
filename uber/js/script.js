window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu_item'),
        hamburger = document.querySelector('.hamburger');
    function openMenu() {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
        document.body.classList.toggle('hide');
    }
    menuItem.forEach(item => {
        item.addEventListener('click', openMenu);
    });
    hamburger.addEventListener('click', openMenu);
    // modal
    const openBtn = document.querySelectorAll("[data-modal=consultation]"),
        overlay = document.querySelector('.overlay'),
        modal = document.querySelector('.modal'),
        closeBtn = document.querySelector('.modal__close');
    openBtn.forEach(item => {
        item.addEventListener('click', openModal);
    });
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        } 
    });
    function openModal() {
        overlay.classList.add('show', 'fade');
        modal.classList.add('show', 'fade');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        overlay.classList.remove('show', 'fade');
        modal.classList.remove('show', 'fade');
        document.body.style.overflow = '';
    }
    // pageup
    $(document).ready(function(){
        $(window).scroll(function(){
            if ($(this).scrollTop() > 800) {
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
        // $('[data-modal=consultation]').on('click', function(){
        //     $('.overlay, #consultation').fadeIn('slow');
        //     // document.body.style.overflow = '';
        // });
        // $('.modal__close').on('click', function(){
        //     $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        // });
        function validateForms(form){
            $(form).validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2
                    },
                    phone: 'required',
                    email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    name: {
                        required: "Введите свое имя",
                        minlength: jQuery.validator.format("Введите {0} символа!")
                    },
                    phone: "Введите номер телефона",
                    email: {
                      required: "Введите свою почту",
                      email: "Неправильно введен адрес почты"
                    }
                  }
            });
        };
        validateForms('#consultation form');
        validateForms('#order form');
        $('input[name=phone]').mask("+7 (999) 999-99-99");
    });
});



