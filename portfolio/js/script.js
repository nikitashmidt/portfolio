    $(document).ready(function(){
        $(window).scroll(function(){
            if ($(this).scrollTop() > 900) {
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