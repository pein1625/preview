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

      if (options.paginationType) {
        options.pagination.type = options.paginationType;
      }
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  addSwiper(".partner-slider", {
    navigation: true,
    speed: 500,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    slidesPerView: 3,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5
      },
      1200: {
        slidesPerView: 6
      }
    }
  });
});

$(function () {
  var $serviceSlider = $(".service-slider");

  if (!$serviceSlider.length) return;

  var loopedSlides = $serviceSlider.find(".swiper-slide").length;

  addSwiper(".service-slider", {
    navigation: true,
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    loopedSlides: loopedSlides,
    centeredSlides: true,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
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
      disableOnInteraction: false
    },
    autoHeight: true
  });
});

$(function () {
  var $sync1 = $(".sync-1");

  if (!$sync1.length) return;

  var loopedSlides = $sync1.find(".swiper-slide").length;

  const sync1 = addSwiper(".sync-1", {
    navigation: true,
    centeredSlides: true,
    loop: true,
    loopedSlides: loopedSlides,
    slidesPerView: 1,
    speed: 400,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 5
      }
    }
  })[0];

  const sync2 = addSwiper(".sync-2", {
    effect: "fade",
    loop: true,
    loopedSlides: loopedSlides,
    autoHeight: true
  })[0];

  sync1.controller.control = sync2;
  sync2.controller.control = sync1;
});

$(function () {
  var $sliderEl = $(".product-slider");

  if (!$sliderEl.length) return;

  var loopedSlides = $sliderEl.find(".swiper-slide").length;

  addSwiper(".product-slider", {
    navigation: true,
    spaceBetween: 30,
    speed: 400,
    centeredSlides: true,
    loop: true,
    loopedSlides: loopedSlides,
    slidesPerView: 1,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      }
    }
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
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    spaceBetween: 10
    // paginationType: "progressbar",
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