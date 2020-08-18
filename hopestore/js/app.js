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
  addSwiper(".product-slider", {
    navigation: true,
    pagination: true,
    slidesPerView: 2,
    slidesPerColumn: 2,
    slidesPerColumnFill: "row",
    spaceBetween: 16,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
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

// common.js
document.addEventListener("DOMContentLoaded", function () {
  $(".js-receiver-info-checker").on("change", function () {
    if (this.checked) {
      $(".js-receiver-info-form").slideUp();
    } else {
      $(".js-receiver-info-form").slideDown();
    }
  });
});