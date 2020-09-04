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
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
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
  })[0];

  addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
});

// smooth scroll to div

$(function () {

  $(".js-scroll-to").on("click", function (e) {

    e.preventDefault();

    const $el = $(this),
          target = $el.data("target") || $el.attr("href"),
          offset = parseInt($el.data("offset")) || 0,
          duration = parseInt($el.data("duration")) || 800;

    if (!$(target).length) return;

    $("html, body").animate({

      scrollTop: $(target).offset().top - offset

    }, duration);
  });
});

// common.js
$(function () {
  $(".search-btn").on("click", function (e) {
    e.stopPropagation();

    $(".search").fadeToggle();
  });

  $(".search").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    $(".search").hide();
  });
});

$(function () {
  $(".js-filter-reset-block").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".filter__group").find("input").prop("checked", false);
  });
});

$(function () {
  var images = document.querySelectorAll(".parallax");
  new simpleParallax(images, {
    overflow: true,
    scale: 2
  });
});