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

    if (selector == ".thumb-slider") {
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        type: "progressbar"
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  addSwiper(".banner-slider", {
    navigation: true,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    autoHeight: true
  });
});

// vertical preview sync slider
$(function () {
  if (!$(".preview-slider, .thumb-slider").length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var length = $(".thumb-slider").find(".swiper-slide").length;

  var thumbSlider = addSwiper(".thumb-slider", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    navigation: length > 3,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    spaceBetween: 10,
    breakpoints: {
      1200: {
        spaceBetween: 15
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

  $(".as-menu__sub-item").on("mouseenter", function () {

    if ($(window).width() < 1200) return;

    $(this).find(".as-menu__sub-2").slideDown();
  });

  $(".as-menu__sub-link").on("click", function (e) {

    const $sub = $(this).siblings(".as-menu__sub-2");

    if ($(window).width() >= 1200 || !$sub.length) return;

    e.preventDefault();

    $sub.slideToggle();

    $(".as-menu__sub-2").not($sub).slideUp();
  });

  $(".as-menu__sub-2-link").on("click", function (e) {

    const $sub = $(this).siblings(".as-menu__sub-3");

    if (!$sub.length) return;

    e.preventDefault();

    $sub.slideToggle();

    $(".as-menu__sub-3").not($sub).slideUp();
  });

  $(".as-menu").on("mouseleave", function () {

    $(".as-menu__sub-2:not(.active)").slideUp("fast");

    $(".as-menu__sub-3").slideUp("fast");
  });
});