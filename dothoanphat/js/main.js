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
    slidesPerView: 5,
    freeMode: true,
    spaceBetween: 8,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    breakpoints: {
      576: {
        slidesPerView: 4
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

// banner-slider
$(function () {
  addSwiper(".banner-slider", {
    pagination: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    speed: 600,
    loop: true
  });
});

// product-slider
$(function () {
  addSwiper(".product-slider", {
    slidesPerView: 5,
    spaceBetween: 20,
    navigation: true,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      1199: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 12
      }
    }
  });
});

// product-slider-2
$(function () {
  addSwiper(".product-slider-2", {
    navigation: true,
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    breakpoints: {
      1199: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 16
      }
    }
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

// quantity input
$(function () {
  var $input = $(".quantity__input");
  var $btn = $(".quantity__btn");

  // only number
  $input.on("keydown", function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {
      return;
    }
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  // click to plus number
  $btn.on("click", function () {
    var $siblingInput = $(this).siblings(".quantity__input");
    var plus = $(this).data("plus");
    var value = $siblingInput.val();
    var newValue = parseInt(value) + plus;

    if (newValue > 0) {
      $siblingInput.val(newValue);
      $siblingInput.trigger("change");
    }
  });

  // prevent paste value
  $input.on("paste", function (e) {
    var paste = e.originalEvent.clipboardData.getData("text");
    var pasteNum = parseInt(paste);

    if (pasteNum > 0) {
      return;
    } else {
      e.preventDefault();
    }
  });

  $input.on("change", function () {
    var val = $(this).val();

    if (val && parseInt(val) > 0) {
      return;
    }

    $(this).val(1);
  });
});

// common.js
$(function () {
  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();

    if (scrollTop > 100) {
      $(".btn-movetop").fadeIn();
    } else {
      $(".btn-movetop").fadeOut();
    }
  });

  $(".btn-movetop").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 800);
  });
});

$(function () {
  $(".as-menu__toggle").on("click", function () {
    const $toggle = $(this);
    const $sub = $toggle.siblings(".as-menu__sub");

    $toggle.toggleClass("active");
    $sub.slideToggle();
  });
});

$(function () {
  $(".js-zoom").each(function () {
    const $el = $(this);
    const url = $el.data("url");

    $el.zoom({
      url: url
    });
  });
});