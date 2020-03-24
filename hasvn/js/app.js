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

$(function () {
  var loopedSlides = $('.partner-slider').find('.swiper-slide').length;

  addSwiper('.partner-slider', {
    autoplay: {
      delay: 3000
    },
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    speed: 500,
    loopedSlides: loopedSlides,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    breakpoints: {
      768: {
        spaceBetween: 30
      },
      1200: {
        spaceBetween: 60
      }
    }
  });
});

$(function () {
  const bannerSlider = addSwiper('.banner-slider', {
    loop: true,
    effect: 'fade',
    autoHeight: true,
    navigation: true,
    speed: 600,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  })[0];

  bannerSlider.on("transitionStart", function () {
    var bannerChars = $(".banner-slider").find(".swiper-slide-active").find(".banner-slider__title span");

    letterAnimation(bannerChars);
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + '__container');

    if (options.navigation) {
      $sliderContainer.addClass('has-nav');
      options.navigation = {
        prevEl: $sliderContainer.find(selector + '__prev'),
        nextEl: $sliderContainer.find(selector + '__next')
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass('has-pagination');
      options.pagination = {
        el: $sliderContainer.find(selector + '__pagination'),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

// common.js

$(function () {

  $('.js-search-toggle').on('click', function (e) {

    e.stopPropagation();

    $('.search').fadeIn();
  });

  $('.search').on('click', function (e) {

    e.stopPropagation();
  });

  $('html, body').on('click', function () {

    if ($(window).width() >= 1200) {

      $('.search').fadeOut();
    }
  });
});

$(document).ready(function () {

  $(".banner-slider__title").lettering();
});

function letterAnimation(el) {

  var title1 = new TimelineMax();

  title1.staggerFromTo(el, 0.45, {

    ease: Back.easeOut.config(1.7),

    opacity: 0,

    bottom: -80

  }, { ease: Back.easeOut.config(1.7), opacity: 1, bottom: 0 }, 0.045);
}