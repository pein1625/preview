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

$(function () {
  addSwiper(".product-slider", {
    slidesPerView: 2,
    pagination: true,
    spaceBetween: 10,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    }
  });
});

$(function () {
  const sliders = addSwiper(".product-slider-2", {
    navigation: true,
    slidesPerView: 2,
    slidesPerColumn: 2,
    slidesPerColumnFill: "row",
    speed: 600,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5
      }
    }
  });

  $(".js-product-tab").on("shown.bs.tab", function () {
    sliders.map(function (slider) {
      slider.update();
    });
  });
});

$(function () {
  addSwiper(".product-slider-3", {
    navigation: true,
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    breakpoints: {
      576: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4
      },
      1200: {
        slidesPerView: 5
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

$(function () {

  $(".js-post-content").find("table").addClass("table table-bordered table-hover mb-0").wrap('<div class="table-responsive"></div>');
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
  $(".pd-menu__toggle").on("click", function (e) {
    e.preventDefault();

    if ($(window).width() < 1200) {
      $(".pd-menu__dropdown").slideToggle();
    }
  });
});