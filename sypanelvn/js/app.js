// menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });
});

// navbar mobile toggle
$(function () {
  var $body = $('html, body');
  var $navbar = $('.js-navbar');
  var $navbarOpen = $('.js-navbar-open');
  var $navbarClose = $('.js-navbar-close');

  $navbarOpen.on('click', function () {
    $navbar.addClass('is-show');
    $body.addClass('overflow-hidden');
  });

  $navbarClose.on('click', function () {
    $navbar.removeClass('is-show');
    $body.removeClass('overflow-hidden');
  });
});

// script for sticky items
$(function () {
  var $moveTop = $('.btn-movetop');
  var $window = $(window);

  if (!$moveTop.length) return;

  $window.on('scroll', function () {
    if ($window.scrollTop() > 150) {
      $moveTop.fadeIn();

      return;
    }

    $moveTop.fadeOut();
  });

  $moveTop.on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next")
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  addSwiper(".partner-slider", {
    navigation: true,
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteration: false
    },
    breakpoints: {
      768: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 30
      }
    }
  });
});

$(function () {
  addSwiper(".banner-slider", {
    navigation: true,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteration: false
    }
  });
});

// common.js

$(function () {

  $(".search-btn").on("click", function (e) {

    e.stopPropagation();

    $(".search").fadeToggle();
  });

  $(".search").on("click", function (e) {

    e.stopPropagation();
  });

  $("html, body").on("click", function () {

    $(".search").hide();
  });
});

$(function () {

  calcStickyContactPos();

  $(window).on("scroll", calcStickyContactPos);
});

function calcStickyContactPos() {

  if ($(window).width() < 1200) return;

  var $sticky = $(".sticky-contact");

  var vh = $(window).height();

  var scrollTop = $(window).scrollTop();

  var $asMenu = $(".as-menu");

  if (!$asMenu.length) return;

  var asMenuOffset = $asMenu.offset().top;

  var asMenuHeight = $asMenu.outerHeight();

  var $end = $(".js-sticky-contact-end");

  var endOffset = $end.offset().top;

  var stickyHeight = Array.from(document.querySelectorAll(".as-contact"), function (item) {

    return $(item).outerHeight();
  }).reduce(function (carry, item) {

    return carry > item ? carry : item;
  });

  $sticky.css({

    top: 30,

    bottom: "auto"

  });

  if (asMenuOffset + asMenuHeight > scrollTop) {

    $sticky.css({

      top: asMenuOffset + asMenuHeight + 30 - scrollTop,

      bottom: "auto"

    });
  }

  if (endOffset - scrollTop - stickyHeight - 60 < 0) {

    $sticky.css({

      top: "auto",

      bottom: vh - (endOffset - scrollTop) + 30 + stickyHeight

    });
  }
}