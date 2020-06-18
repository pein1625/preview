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
  addSwiper(".banner-slider", {
    navigation: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    speed: 600,
    autoHeight: true,
    loop: true
  });
});

$(function () {
  addSwiper(".product-slider", {
    navigation: true,
    slidesPerView: 2,
    loop: true,
    speed: 400,
    breakpoints: {
      768: {
        slidesPerView: 2.5
      },
      992: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      }
    }
  });
});

$(function () {
  var $body = $('body');
  var $cart = $('.js-cart');
  var $cartOpen = $('.js-cart-open');
  var $cartClose = $('.js-cart-close');

  $cartOpen.on('click', function (e) {
    e.preventDefault();

    $cart.addClass('is-show');
    $body.addClass('overflow-hidden');
  });

  $cartClose.on('click', function (e) {
    e.preventDefault();

    $cart.removeClass('is-show');
    $body.removeClass('overflow-hidden');
  });
});

// quantity input

$(function () {

  const $document = $(document);

  $document.on("focus", ".quantity__input, [data-number-input]", function () {

    const $input = $(this);

    const min = $input.data("min") !== undefined ? parseInt($input.data("min")) : 1;

    if ($input.hasClass("is-binded")) return;

    $input.addClass("is-binded");

    $input.on("change", function () {

      var val = $input.val();

      console.log("changed");

      if (val && parseInt(val) >= min) {

        return;
      }

      $input.val(min);

      $input.trigger("change");
    }).on("keydown", function (e) {

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {

        return;
      }

      if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {

        e.preventDefault();
      }
    }).on("keyup", function (e) {

      if ($input.val() == "") return;

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {

        $input.trigger("change");

        return;
      }

      if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {

        return;
      }

      $input.trigger("change");
    }).on("paste", function (e) {

      var paste = e.originalEvent.clipboardData.getData("text");

      var pasteNum = parseInt(paste);

      if (pasteNum > 0) {

        return;
      } else {

        e.preventDefault();
      }
    });
  });

  $document.on("click", ".quantity__btn", function (e) {

    e.preventDefault();

    var $siblingInput = $(this).siblings(".quantity__input");

    var plus = $(this).data("plus");

    var value = $siblingInput.val();

    var newValue = parseInt(value) + plus;

    var min = $siblingInput.data("min") !== undefined ? parseInt($siblingInput.data("min")) : 1;

    if (newValue >= min) {

      $siblingInput.val(newValue);

      $siblingInput.trigger("change");
    }
  });
});

// common.js
$(function () {
  $(".js-menu-tab").on("click", function () {
    if ($(window).width() < 1200) return;

    if ($(this).hasClass("active")) return;

    $(".js-menu-tab.active").removeClass("active");

    $(this).addClass("active");
  });
});

$(function () {
  $(window).on("scroll", function () {
    if ($(window).width() < 1200) return;

    if ($(window).scrollTop() > 260) {
      $(".navigation").addClass("is-fixed");
    } else {
      $(".navigation").removeClass("is-fixed");
    }
  });
});