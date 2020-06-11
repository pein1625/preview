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

var brandSlider = null;
var langSlider = null;

$(function () {
  addSwiper(".banner-slider", {
    pagination: true,
    navigation: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    autoHeight: true,
    speed: 600,
    loop: true
  });
});

$(function () {
  var selector = ".brand-slider";
  var $sliderContainer = $(selector),
      $sliderEl = $sliderContainer.find(selector + "__container");

  if (!$sliderContainer.length) return;

  var options = {
    slidesPerView: 1,
    speed: 500,
    spacebetween: 10,
    direction: "vertical",
    navigation: {
      prevEl: ".js-brand-slider-prev",
      nextEl: ".js-brand-slider-next"
    }
  };

  brandSlider = new Swiper($sliderEl, options);

  if (!brandSlider) return;

  var token = true;

  $(".brand-slider").bind("mousewheel", function (e) {
    e.preventDefault();

    if (!token) return;
    token = false;

    if (e.originalEvent.wheelDelta > 0) {
      brandSlider.slidePrev();
    } else {
      brandSlider.slideNext();
    }

    setTimeout(function () {
      token = true;
    }, 300);
  });
});

$(function () {
  var selector = ".lang-slider";
  var $sliderContainer = $(selector),
      $sliderEl = $sliderContainer.find(selector + "__container");

  if (!$sliderContainer.length) return;

  var options = {
    slidesPerView: 1,
    speed: 300,
    spaceBetween: 4,
    direction: "vertical",
    navigation: {
      prevEl: ".js-lang-slider-prev",
      nextEl: ".js-lang-slider-next"
    }
  };

  langSlider = new Swiper($sliderEl, options);

  if (!langSlider) return;

  var token = true;

  $(".lang-slider").bind("mousewheel", function (e) {
    e.preventDefault();

    if (!token) return;
    token = false;

    if (e.originalEvent.wheelDelta > 0) {
      langSlider.slidePrev();
    } else {
      langSlider.slideNext();
    }

    setTimeout(function () {
      token = true;
    }, 150);
  });
});

$(function () {
  addSwiper(".product-slider", {
    navigation: true,
    spaceBetween: 30,
    speed: 600,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
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

$(function () {
  addSwiper(".banner-slider-2", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });
});

$(function () {
  if (!($(".sync-1").length && $(".sync-2").length)) {
    return;
  }

  const sync1 = addSwiper(".sync-1", {
    navigation: true,
    slidesPerView: "auto",
    spaceBetween: 10
  })[0];

  addSwiper(".sync-2", {
    effect: "fade",
    autoHeight: true,
    allowTouchMove: false,
    thumbs: {
      swiper: sync1
    }
  });
});

$(function () {
  addSwiper(".partner-slider", {
    navigation: true,
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    speed: 400,
    breakpoints: {
      768: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20
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

// common.js

$(function () {

  $(".as-menu__toggle").on("click", function () {

    $(this).toggleClass("active");

    $(this).siblings(".as-menu__sub").slideToggle();
  });
});

$(function () {

  $(".js-radio-group-btn").on("change", function () {

    var $el = $(this);

    var $item = $el.closest(".radio-group__item");

    var $desc = $item.find(".radio-group__desc");

    var $otherDesc = $item.siblings(".radio-group__item").find(".radio-group__desc");

    if ($desc) {

      $desc.slideDown();
    }

    if ($otherDesc) {

      $otherDesc.slideUp();
    }
  });
});

$(function () {

  $(".js-show-popup").on("click", function (e) {

    e.preventDefault();

    e.stopPropagation();

    var $btn = $(this);

    var $otherBtn = $(".js-show-popup").not($btn);

    var target = $btn.data("target");

    var $otherDropdown = $(".h-dropdown").not($(target));

    var holdTarget = $btn.data("holdTarget");

    if ($btn.hasClass("active")) {

      $btn.removeClass("active");

      $(".h-dropdown").hide();

      return;
    }

    $btn.addClass("active");

    if (!holdTarget) {

      $otherBtn.removeClass("active");
    }

    $(target).fadeIn();

    $otherDropdown.hide();

    if (target == "#popup-menu" && !$(target).length) {

      $(".h-dropdown-menu").eq(0).show();
    }

    setTimeout(function () {

      if (brandSlider) brandSlider.update();

      if (langSlider) {

        langSlider.update();

        var index = $(".lang-slider").find(".lang-slider__item.active").closest(".swiper-slide").index();

        langSlider.slideTo(index, 0);
      }
    }, 300);

    manipulateBtns(target);
  });

  $(".h-dropdown").on("click", function (e) {

    e.stopPropagation();
  });

  $("html, body").on("click", hidePopups);

  function hidePopups() {

    $(".h-dropdown").hide();

    $(".js-show-popup").removeClass("active");
  }
});

$(function () {

  $(".pd-menu__toggle").on("click", function (e) {

    e.preventDefault();

    var $btn = $(this);

    var $subMenu = $btn.parent().siblings(".pd-menu__sub");

    if (!$subMenu[0]) return;

    var $otherItem = $btn.closest(".pd-menu__item").siblings(".pd-menu__item");

    $subMenu.toggle();

    if ($subMenu.hasClass("pd-menu__sub--scroll")) {

      $subMenu.toggleClass("js-scroll-target");
    }

    $btn.parent().toggleClass("active");

    $otherItem.find(".pd-menu__link").removeClass("active");

    $otherItem.find(".pd-menu__sub").removeClass("js-scroll-target").hide();

    var $popup = $(this).closest(".h-dropdown");

    if ($popup.is("#popup-menu")) {

      var $menu = $(this).closest(".pd-menu");

      manipulateBtns($popup);
    }
  });
});

function manipulateBtns(target) {

  var $dropdown = $(target);

  var $body = $dropdown.find(".js-scroll-target");

  var $scrollUp = $dropdown.find(".js-scroll-up");

  var $scrollDown = $dropdown.find(".js-scroll-down");

  if (!$body.length) return;

  var bodyEl = $body.get(0);

  toggleBtn();

  if (!checkOffset(bodyEl)) return;

  $body.on("scroll", toggleBtn);

  $scrollUp.on("click", function () {

    bodyEl.scrollTop = bodyEl.scrollTop - 100;
  });

  $scrollDown.on("click", function () {

    bodyEl.scrollTop = bodyEl.scrollTop + 100;
  });

  function toggleBtn() {

    if (checkScrollStart(bodyEl)) {

      $scrollUp.hide();
    } else {

      $scrollUp.show();
    }

    if (checkScrollEnd(bodyEl)) {

      $scrollDown.hide();
    } else {

      $scrollDown.show();
    }
  }
}

function checkOffset(el) {

  return el.offsetHeight < el.scrollHeight || el.offsetWidth < el.scrollWidth;
}

function checkScrollEnd(el) {

  return el.scrollTop + el.clientHeight == el.scrollHeight;
}

function checkScrollStart(el) {

  return !el.scrollTop;
}

$(function () {

  $(".js-avatar-input").change(function () {

    var input = this;

    if (input.files && input.files[0]) {

      var reader = new FileReader();

      reader.onload = function (e) {

        $(".js-avatar-preview").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  });
});

$(function () {

  // Multiple images preview in browser

  var imagesPreview = function (input, placeToInsertImagePreview) {

    if (input.files) {

      var filesAmount = input.files.length;

      for (i = 0; i < filesAmount; i++) {

        var reader = new FileReader();

        reader.onload = function (event) {

          $($.parseHTML("<img>")).attr("src", event.target.result).appendTo(placeToInsertImagePreview);
        };

        reader.readAsDataURL(input.files[i]);
      }
    }
  };

  $("#gallery-photo-add").on("change", function () {

    imagesPreview(this, ".input-gallery");
  });
});

$(function () {

  if ($(window).width() < 992) {

    return;
  }

  $(".js-zoom").each(function () {

    let url = $(this).data("url");

    $(this).zoom({

      url: url

    });
  });
});

$(".js-payment-method").on("change", function () {

  var val = $(this).val();

  var hook = $(this).data("hook");

  if (val == hook) {

    $(".js-payment-expand").slideDown();
  } else {

    $(".js-payment-expand").slideUp();
  }
});