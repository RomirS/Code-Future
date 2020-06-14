!function(e,i){if("function"==typeof define&&define.amd)define(["exports","jquery"],function(e,r){return i(e,r)});else if("undefined"!=typeof exports){var r=require("jquery");i(exports,r)}else i(e,e.jQuery||e.Zepto||e.ender||e.$)}(this,function(e,i){function r(e,r){function n(e,i,r){return e[i]=r,e}function a(e,i){for(var r,a=e.match(t.key);void 0!==(r=a.pop());)if(t.push.test(r)){var u=s(e.replace(/\[\]$/,""));i=n([],u,i)}else t.fixed.test(r)?i=n([],r,i):t.named.test(r)&&(i=n({},r,i));return i}function s(e){return void 0===h[e]&&(h[e]=0),h[e]++}function u(e){switch(i('[name="'+e.name+'"]',r).attr("type")){case"checkbox":return"on"===e.value?!0:e.value;default:return e.value}}function f(i){if(!t.validate.test(i.name))return this;var r=a(i.name,u(i));return l=e.extend(!0,l,r),this}function d(i){if(!e.isArray(i))throw new Error("formSerializer.addPairs expects an Array");for(var r=0,t=i.length;t>r;r++)this.addPair(i[r]);return this}function o(){return l}function c(){return JSON.stringify(o())}var l={},h={};this.addPair=f,this.addPairs=d,this.serialize=o,this.serializeJSON=c}var t={validate:/^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,key:/[a-z0-9_]+|(?=\[\])/gi,push:/^$/,fixed:/^\d+$/,named:/^[a-z0-9_]+$/i};return r.patterns=t,r.serializeObject=function(){return new r(i,this).addPairs(this.serializeArray()).serialize()},r.serializeJSON=function(){return new r(i,this).addPairs(this.serializeArray()).serializeJSON()},"undefined"!=typeof i.fn&&(i.fn.serializeObject=r.serializeObject,i.fn.serializeJSON=r.serializeJSON),e.FormSerializer=r,r});

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
let SUBMIT = $('#signup p');
SUBMIT.click(function () {
    SUBMIT[0].innerHTML = 'Thanks!';
    FORM.submit();
    FORM[0].reset();
});