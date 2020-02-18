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

// sliders


// horizontal preview sync slider
$(function () {
  if (!$('.preview-slider, .thumb-slider').length) {
    return;
  }

  if (!window.addSwiper) {
    console.warn('"addSwiper" funtion is required!');
    return;
  }

  var thumbSlider = addSwiper('.thumb-slider', {
    slidesPerView: 5,
    freeMode: true,
    spaceBetween: 8,
    navigation: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    breakpoints: {
      576: {
        slidesPerView: 4
      }
    }
  })[0];

  addSwiper('.preview-slider', {
    effect: 'fade',
    allowTouchMove: false,
    thumbs: {
      swiper: thumbSlider
    }
  });
});

$(function () {
  addSwiper('.menu-slider', {
    freeMode: true,
    slidesPerView: 10,
    slidesPerColumn: 2,
    allowTouchMove: false,
    navigation: true,
    breakpoints: {
      1199: {
        slidesPerView: 8
      },
      991: {
        slidesPerView: 6
      },
      767: {
        slidesPerView: 4
      },
      575: {
        slidesPerView: 3
      }
    }
  });
});

$(function () {
  addSwiper('.key-slider', {
    navigation: true,
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true
  });
});

$(function () {
  addSwiper('.product-slider', {
    navigation: true,
    slidesPerView: 5,
    spaceBetween: 20,
    breakpoints: {
      1199: {
        spaceBetween: 20,
        slidesPerView: 4
      },
      991: {
        spaceBetween: 20,
        slidesPerView: 3
      },
      767: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      575: {
        spaceBetween: 10,
        slidesPerView: 2
      }
    }
  });
});

$(function () {
  addSwiper('.banner-slider', {
    navigation: true,
    pagination: true,
    loop: true,
    autoHeight: true,
    speed: 600,
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
        $sliderEl = $sliderContainer.find(selector + '__container');

    if (options.navigation) {
      $sliderContainer.addClass('has-nav');
      options.navigation = {
        prevEl: $sliderContainer.find(selector + '__prev'),
        nextEl: $sliderContainer.find(selector + '__next')
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass('has-pagination');
      options.pagination = {
        el: $sliderContainer.find(selector + '__pagination'),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

// quantity input
$(function () {
  var $input = $('.quantity__input');
  var $btn = $('.quantity__btn');

  // only number
  $input.on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {
      return;
    }
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });

  // click to plus number
  $btn.on('click', function () {
    var $siblingInput = $(this).siblings('.quantity__input');
    var plus = $(this).data('plus');
    var value = $siblingInput.val();
    var newValue = parseInt(value) + plus;

    if (newValue > 0) {
      $siblingInput.val(newValue);
      $siblingInput.trigger('change');
    }
  });

  // prevent paste value
  $input.on('paste', function (e) {
    var paste = e.originalEvent.clipboardData.getData('text');
    var pasteNum = parseInt(paste);

    if (pasteNum > 0) {
      return;
    } else {
      e.preventDefault();
    }
  });

  $input.on('change', function () {
    var val = $(this).val();

    if (val && parseInt(val) > 0) {
      return;
    }

    $(this).val(1);
  });
});

// common.js
$(function () {
  $(".js-avatar-input").change(function () {
    var input = this;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.js-avatar-preview').attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  });
});

$(function () {
  $(".js-hover-zoom").each(function () {
    var url = $(this).data('image');

    $(this).zoom({
      url: url
    });
  });
});

$(function () {
  $('.js-order-toggle').on('change', function () {
    var checked = $(this).prop('checked');
    var $expand = $('.order__info--expand');

    if (checked) {
      $expand.slideUp();
    } else {
      $expand.slideDown();
    }
  });
});

$(function () {
  numberInput('.price-range__input');
});

$(function () {
  $('.js-modal-switch').on('click', function () {
    var $el = $(this);
    var target = $el.attr('href');

    $el.closest('.modal').modal('hide');

    setTimeout(function () {
      $(target).modal('show');
    }, 300);
  });
});

$(function () {
  $dealine = $('#js-deadline');
  if ($dealine.length) {
    const deadline = $dealine.data('deadline');
    initialClock('js-deadline', deadline);
  }
});

function initialClock(id, endtime) {
  var clock = document.getElementById(id);
  if (!clock) {
    return;
  }
  var timeinterval = setInterval(function () {
    var t = getTimeRemaining(endtime);
    clock.innerHTML = `
<div class="countdown__number">${t.hours}</div>
<div class="countdown__divider">:</div>
<div class="countdown__number">${t.minutes}</div>
<div class="countdown__divider">:</div>
<div class="countdown__number">${t.seconds}</div>
    `;
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }, 1000);
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  if (t < 0) return {
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  var hours = Math.floor(t / (1000 * 60 * 60) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  if (days > 99) {
    days = 99;
  }
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

// allow number input
function numberInput(className) {
  var input = $(className);
  input.keydown(function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {
      return;
    }
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
}