var exec = false;
var NAVENTRY;
var DROPDOWN = $('#dropdown').detach();
function makeResponsive() {
    let dominoPos = -1 * (0.5 * window.innerWidth - 720);
    $('#dominos')[0].setAttribute('viewBox', dominoPos + ' 0 1298 615');
    let arrowPos = -1 * (0.02 * window.innerWidth - 30);
    $('#arrow')[0].setAttribute('viewBox', arrowPos + ' -10 91 115');

    var setMax = false;
    if (window.innerWidth >= 850) {
        setMax = true;
        if (exec) {
            exec = false;
            $('.navBar').append(NAVENTRY);
            DROPDOWN = $('#dropdown').detach();
        }
    } else {
        if (!exec) {
            exec = true;
            $('.navBar').append(DROPDOWN);
            NAVENTRY = $('.navEntry').detach();
        }
    }
    function modifyProp(tag, prop, val) {
        if (setMax) $(tag).css(prop, val/100 * 850);
        else $(tag).css(prop, `${val}vw`);
    }

    modifyProp('.title h1', 'font-size', 12.9);
    modifyProp('.title h1', 'margin-bottom', 2.35);
    modifyProp('.title h2', 'font-size', 4.7);
    modifyProp('.child h2', 'font-size', 4.2);

    toggleSidebar()

    if (window.innerWidth >= 1025) {
        $('.row').css('flex-direction', 'row');
        $('.child').css('margin', '0 0 3vw 0');
        $('.row input:text').css('width', '100%');
    } else {
        $('.row').css('flex-direction', 'column');
        $('.child').css('margin', '0 auto 3vw auto');
        $('.row input:text').css('width', '80%');
    }

    $('.frame').each(function() {
        var totalHeight = 0
        $(this).children().each(function() {
            if($(this).css('position') != 'absolute' && !$(this).is('iframe')) totalHeight += $(this).outerHeight(true);
        });
        if( totalHeight > 850 ) $(this).css('height', totalHeight)
        else $(this).css('height', '850px')
    });
}

makeResponsive();
window.addEventListener('resize', (e) => {
    makeResponsive();
});

$('button').each(function() {
    $(this).click(function() {
       scrollTo(this.innerHTML.toLowerCase().replace(/\s/g, ''));
    });
});

$('.noselect').each(function() {
    $(this).click(() => {
        scrollTo('joinus');
    });
});

$('.child svg').each(function() {
    $(this).mousedown(function() {
        $(this).removeClass('bgshadow');
    }).mouseup(function() {
        $(this).addClass('bgshadow');
        scrollTo($(this).attr('name'));
    });
});

$('#arrow path').mousedown(function() {
    $('#arrow').removeClass('bgshadow');
}).mouseup(function() {
    $('#arrow').addClass('bgshadow');
    scrollTo('mission');
});

function scrollTo(elem) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#' + elem).offset().top
    }, 600);
}

if ($(document.documentElement).scrollTop() <= 700) $('.sidebar').hide();
$(function () {
    $(window).scroll(function() {
        toggleSidebar()
    });
});

function toggleSidebar() {
    if ($(document.documentElement).scrollTop() > 700 && window.innerWidth > 1150) $('.sidebar').fadeIn(200);
    else $('.sidebar').fadeOut(200);
}

let FORM = $('#signup');
$(document).ready(function(){
    FORM.submit(function(e){
        e.preventDefault();
        var formData = {};
        FORM.find('input').each(function() {
            formData[$(this).attr('id')] = $(this).val();
        });
        $.ajax({
            type: "POST",
            url: "submitFormData",
            data: formData,
            dataType: "json",
            success: function() {
                console.log('SUCCESS!')
            },
            error: function (_, _, errorMessage) {
                console.log('Email error: ' + errorMessage);
            }
        });
    });
});
let SUBMIT = $('#signup p');
SUBMIT.click(function () {
    FORM.submit();
    SUBMIT[0].innerHTML = 'Thanks!';
    FORM[0].reset();
});