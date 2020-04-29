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

// vertical preview sync slider
$(function () {
  if (!$(".preview-slider, .thumb-slider").length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var thumbSlider = addSwiper(".thumb-slider", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    spaceBetween: 16,
    breakpoints: {
      576: {
        spaceBetween: 10
      }
    }
  })[0];

  addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
});

// common.js

$(function () {

  $(".lang__item").on("click", function (e) {

    e.stopPropagation();

    $(".lang__dropdown").fadeToggle();
  });

  $("html, body").on("click", function () {

    $(".lang__dropdown").hide();
  });

  $(".lang__dropdown").on("click", function (e) {

    e.stopPropagation();
  });
});

$(function () {

  new WOW().init();
});