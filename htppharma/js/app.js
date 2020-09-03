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
  var $body = $("html, body");
  var $header = $(".header");
  var $navbar = $(".js-navbar");
  var $navbarToggle = $(".js-navbar-toggle");
  var $menu = $(".menu-root");
  var timeout = null;

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
    $header.toggleClass("active");

    if ($navbar.hasClass("is-show")) {
      timeout = setTimeout(function () {
        $menu.addClass("is-show");
      }, 500);
    } else {
      clearTimeout(timeout);
      $menu.removeClass("is-show");
    }
  });
});

// require _scroll-to-dip.js
$(function () {
  var $moveTop = $(".btn-movetop");
  var $window = $(window);

  if (!$moveTop.length) return;

  $window.on("scroll", function () {
    if ($window.scrollTop() > 150) {
      $moveTop.fadeIn();

      return;
    }

    $moveTop.fadeOut();
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
  addSwiper(".news-slider-2", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: true
  });
});

// horizontal preview sync slider
$(function () {
  if (!$(".preview-slider, .thumb-slider").length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var thumbSlider = addSwiper(".thumb-slider", {
    slidesPerView: 4,
    freeMode: true,
    spaceBetween: 10,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
  })[0];

  addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
});

$(function () {
  addSwiper(".product-slider", {
    slidesPerView: 1,
    loop: true,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        spaceBetween: 10
      },
      1200: {
        slidesPerView: 2.5
      },
      1400: {
        slidesPerView: 2.5,
        spaceBetween: 20
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

    const min = $input.data("min") || 1;

    const max = $input.data("max");

    let currentValue = min;

    if ($input.hasClass("is-binded")) return;

    $input.addClass("is-binded");

    $input.on("keydown", function (e) {

      currentValue = $input.val();

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {

        return;
      }

      if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {

        e.preventDefault();
      }
    }).on("keyup", function (e) {

      if ($input.val() == "") return;

      let val = $input.val();

      if (val === "" || parseInt(val) < min) {

        $input.val(min);
      }

      if (parseInt(val) > max) {

        $input.val(currentValue);
      }

      $input.trigger("change");
    }).on("paste", function (e) {

      var paste = e.originalEvent.clipboardData.getData("text");

      var pasteNum = parseInt(paste);

      if (pasteNum > max || pasteNum < min) {

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

    var min = $siblingInput.data("min") || 1;

    if (newValue >= min) {

      $siblingInput.val(newValue);

      $siblingInput.trigger("change");
    }
  });
});

// common.js
$(function () {
  $(".anchor-select").on("change", function () {
    let value = $(this).val();

    if (value) {
      location.href = value;
    }
  });
});