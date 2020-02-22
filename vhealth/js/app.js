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

$(function () {
  addSwiper('.news-slider', {
    navigation: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      576: {
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
});

$(function () {
  addSwiper('.product-slider', {
    navigation: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      576: {
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  });
});

$(function () {
  addSwiper('.banner-slider', {
    navigation: true,
    loop: true,
    autoHeight: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });
});

$(function () {
  addSwiper('.slider', {
    slidesPerView: 2,
    spaceBetween: 10,
    navigation: true,
    loop: true,
    breakpoints: {
      575: {
        spaceBetween: 16
      },
      767: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      }
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

$(function () {

  $('.js-aside-menu').on('click', function (e) {

    e.preventDefault();

    let target = $(this).data('target');

    let href = $(this).attr('href');

    if (!$(target).length) {

      return window.location.href = href;
    }

    $('html, body').animate({

      scrollTop: $(target).offset().top

    }, 800);
  });
});

$(function () {

  var targets = window.location.href.match(/#[\w-]+/g);

  if (!targets) {

    return;
  }

  var target = targets[0];

  if (!$(target).length) {

    return;
  }

  $('html, body').animate({

    scrollTop: $(target).offset().top

  }, 300);
});

// menu scroll to section

$(function () {

  $('.js-menu-scroll').on('click', function (e) {

    e.preventDefault();

    var target = $(this).data('target');

    if (!$(target).length) {

      window.location.href = $(this).attr('href');
    }

    $('.js-navbar').removeClass('is-show');

    $('body').removeClass('overflow-hidden');

    $('html, body').animate({

      scrollTop: $(target).offset().top

    }, 1000);
  });
});