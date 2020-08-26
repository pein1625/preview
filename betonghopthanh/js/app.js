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
  const bannerSlider = addSwiper(".banner-slider", {
    loop: true,
    effect: "fade",
    autoHeight: true,
    navigation: true,
    pagination: true,
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  })[0];

  bannerSlider.on("transitionStart", function () {
    var bannerChars = $(".banner-slider").find(".swiper-slide-active").find(".banner-slider__title span");

    letterAnimation(bannerChars);
  });
});

$(function () {
  $(function () {
    addSwiper(".gallery-slider", {
      pagination: true,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      loop: true
    });
  });
});

$(function () {
  addSwiper(".partner-slider", {
    navigation: true,
    speed: 800,
    slidesPerView: 3,
    spaceBetween: 10,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: true,
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 16
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 16
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 16
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 30
      }
    }
  });
});

$(function () {

  $(".js-post-content").find("table").addClass("table table-bordered table-hover mb-0").wrap('<div class="table-responsive"></div>');
});

// common.js
$(function () {
  $(".search-btn").on("click", function (e) {
    e.stopPropagation();
    $(".search").fadeIn();
    $(".search").find("input").focus();
  });

  $(".search").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    if ($(window).width() >= 1200) {
      $(".search").fadeOut();
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

$(function () {
  new WOW().init();
});