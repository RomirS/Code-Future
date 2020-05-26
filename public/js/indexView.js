$('button').each(function() {
    $(this).click(function() {
       scrollTo(this.innerHTML.toLowerCase().replace(/\s/g, ''));
    });
});

function scrollTo(elem) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#' + elem).offset().top
    }, 600);
}

if ($(document.documentElement).scrollTop() <= 700) $('.sidebar').hide();
var executed = false;
$(function () {
    $(window).scroll(function() {
        if ($(document.documentElement).scrollTop() > 700 && !executed) {
            $('.sidebar').fadeIn(200);
            executed = true;
        } else if ($(document.documentElement).scrollTop() <= 700 && executed) {
            $('.sidebar').fadeOut(200);
            executed = false;
        }
    });
});