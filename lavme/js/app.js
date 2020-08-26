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

  $(".cat-slider").on("click", ".swiper-slide-duplicate .menu-toggle", function () {
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
  if (!$(".partner-slider").length) return;

  var loopedSlides = $(".partner-slider").find(".swiper-slide").length;

  addSwiper(".partner-slider", {
    navigation: true,
    freeMode: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    loop: true,
    loopedSlides: loopedSlides,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      992: {
        spaceBetween: 20
      }
    }
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
    watchSlidesVisibility: true,
    breakpoints: {
      768: {
        slidesPerView: 5
      }
    }
  })[0];

  addSwiper(".preview-slider", {
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
});

$(function () {
  $(function () {
    const catSlider = addSwiper(".cat-slider", {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      speed: 600,
      preventClicks: false
    })[0];

    catSlider.on("slideChange", function () {
      $(".cat-slider").find(".menu-sub").slideUp();
      $(".cat-slider").find(".menu-toggle").removeClass("active");
    });
  });
});

$(function () {

  $(".js-post-content").find("table").addClass("table table-bordered table-hover mb-0").wrap('<div class="table-responsive"></div>');
});

// common.js