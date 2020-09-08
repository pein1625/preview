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