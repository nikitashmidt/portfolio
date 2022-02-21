$(document).ready(function () {
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
});
var slideIndex = 1;
showSlides(slideIndex);
function plusSlide() {
    showSlides(slideIndex += 1);
}
function minusSlide() {
    showSlides(slideIndex -= 1);  
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}