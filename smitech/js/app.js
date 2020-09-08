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
  var $navbar = $(".js-navbar");
  var $navbarToggle = $(".js-navbar-toggle");

  $navbarToggle.on("click", function () {
    $navbarToggle.toggleClass("active");
    $navbar.toggleClass("is-show");
    $body.toggleClass("overflow-hidden");
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
  addSwiper(".banner-slider", {
    pagination: true,
    loop: true,
    speed: 800,
    autoHeight: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });
});

$(function () {
  addSwiper(".partner-slider", {
    navigation: true,
    loop: true,
    speed: 600,
    spaceBetween: 16,
    slidesPerView: 2,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 40
      }
    }
  });
});

$(function () {
  addSwiper(".project-slider", {
    navigation: true,
    loop: true,
    speed: 600,
    autoHeight: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });
});

$(function () {
  const productSliders = addSwiper(".product-slider", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    navigation: true,
    speed: 600,
    breakpoints: {
      576: {
        slidesPerView: 1.5
      },
      922: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 2.8
      }
    }
  });

  $(".js-product-tab").on("shown.bs.tab", function () {
    productSliders.map(function (slider) {
      slider.update();
    });
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
    navigation: true,
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

// horizontal preview sync slider
$(function () {
  if (!$(".sync-1-slider, .sync-2-slider").length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var thumbSlider = addSwiper(".sync-2-slider", {
    navigation: true,
    slidesPerView: 4,
    freeMode: true,
    spaceBetween: 10,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
  })[0];

  addSwiper(".sync-1-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
});

// common.js

$(function () {

  floating();
});

// floating

function floating() {

  $(".floating").each(function () {

    var $floating = $(this),
        width = $floating.width(),
        offsetLeft = $floating.offset().left,
        offsetTop = $floating.offset().top;

    $floating.data("offsetLeft", offsetLeft).data("offsetTop", offsetTop).css({

      width: width

    });
  });

  if ($(window).width() < 992) {

    return;
  }

  $(window).on("scroll", function () {

    $(".floating").each(function () {

      var $floating = $(this),
          offsetTop = $floating.data("offsetTop"),
          offsetLeft = $floating.data("offsetLeft"),
          height = $floating.outerHeight(),
          outerHeight = $floating.outerHeight(true),
          $container = $floating.closest(".floating-container"),
          dataTop = $floating.data("top"),
          top = dataTop !== undefined ? parseInt(dataTop) : 70,
          containerHeight = $container.outerHeight(),
          containerOffsetTop = $container.offset().top,
          scrollTop = $(window).scrollTop();

      if (outerHeight + offsetTop == containerHeight + containerOffsetTop) {

        return;
      } else if (scrollTop + top <= offsetTop) {

        $(this).css({

          position: "static"

        });
      } else if (scrollTop + height + top > containerHeight + containerOffsetTop) {

        $(this).css({

          position: "absolute",

          zIndex: 2,

          top: "auto",

          bottom: 0,

          left: "15px"

        });
      } else {

        $(this).css({

          position: "fixed",

          zIndex: 2,

          top: top,

          left: offsetLeft,

          bottom: "auto"

        });
      }
    });
  });
}