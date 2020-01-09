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
    navigation: true,
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

$(function () {
  addSwiper(".news-slider-2", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: true
  });
});

$(function () {
  addSwiper(".news-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: true,
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 16
      }
    }
  });
});

$(function () {
  addSwiper(".product-2-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: true,
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 16
      }
    }
  });
});

$(function () {
  addSwiper(".client-slider", {
    navigation: true,
    loop: true,
    speed: 600,
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 16
      }
    }
  });
});

$(function () {
  addSwiper(".banner-slider", {
    pagination: true,
    loop: true,
    speed: 600,
    autoHeight: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
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

// common.js
$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
      $(".btn-movetop").fadeIn("slow");
    } else {
      $(".btn-movetop").fadeOut("slow");
    }
  });

  $(".btn-movetop").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
    }, 800);
  });
});