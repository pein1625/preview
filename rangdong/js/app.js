// menu toggle
$(function () {
  $(".n-menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".n-menu-sub").slideToggle();

    $toggle.siblings(".n-menu-mega").children(".n-menu-sub").slideToggle();

    $toggle.parent().siblings(".n-menu-item-group").children(".n-menu-sub").slideUp();

    $toggle.parent().siblings(".n-menu-item-group").children(".n-menu-mega").children(".n-menu-sub").slideUp();

    $toggle.parent().siblings(".n-menu-item-group").children(".n-menu-toggle").removeClass("active");
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

$(function () {
  const $partnerSlider = $(".n-partner-slider");

  if (!$partnerSlider.length) {
    return;
  }
  const loopedSlides = $partnerSlider.find(".swiper-slide").length;

  addSwiper(".n-partner-slider", {
    navigation: true,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    spaceBetween: 16,
    loop: true,
    loopedSlides: loopedSlides,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5
      },
      1200: {
        slidesPerView: 6
      }
    }
  });
});

$(function () {
  const slider = addSwiper(".n-video-slider", {
    navigation: true,
    speed: 600
  })[0];

  if (!slider) {
    return;
  }

  slider.on("slideChange", function () {
    const $iframe = $(".n-video-slider").find(".swiper-slide-active").find("iframe");
    const id = $iframe.data("videoId");
    $iframe.attr("src", `https://www.youtube.com/embed/${id}`);
  });
});

$(function () {
  addSwiper(".n-banner-slider", {
    speed: 600,
    pagination: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });
});

$(function () {
  addSwiper(".n-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: true,
    autoHeight: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50
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
    spaceBetween: 8,
    navigation: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    breakpoints: {
      576: {
        slidesPerView: 5,
        spaceBetween: 16
      }
    }
  })[0];

  const previewSlider = addSwiper(".preview-slider", {
    effect: "fade",
    allowTouchMove: false
  })[0];

  $(".js-thumb-slide").on("click", function (e) {
    e.preventDefault();
    var index = $(this).data("index");

    previewSlider.slideTo(index);
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

const colorSliders = [];

// common.js

$(function () {

  $(".js-count").each(function () {

    const count = parseInt($(this).data("count"));

    const offset = $(this).offset().top;

    const $el = $(this);

    let isCount = false;

    $(window).on("load scroll", function () {

      const scrollTop = $(window).scrollTop();

      const viewHeight = $(window).height();

      if (!isCount && scrollTop + viewHeight > offset && scrollTop < offset) {

        $el.countTo({

          from: 0,

          to: count,

          speed: 1400,

          refreshInterval: 5

        });

        isCount = true;
      }
    });
  });
});

// count To

(function ($) {

  $.fn.countTo = function (options) {

    // merge the default plugin settings with the custom options

    options = $.extend({}, $.fn.countTo.defaults, options || {});

    // how many times to update the value, and how much to increment the value on each update

    var loops = Math.ceil(options.speed / options.refreshInterval),
        increment = (options.to - options.from) / loops;

    return $(this).each(function () {

      var _this = this,
          loopCount = 0,
          value = options.from,
          interval = setInterval(updateTimer, options.refreshInterval);

      function updateTimer() {

        value += increment;

        loopCount++;

        $(_this).html(value.toFixed(options.decimals));

        if (typeof options.onUpdate == "function") {

          options.onUpdate.call(_this, value);
        }

        if (loopCount >= loops) {

          clearInterval(interval);

          value = options.to;

          if (typeof options.onComplete == "function") {

            options.onComplete.call(_this, value);
          }
        }
      }
    });
  };

  $.fn.countTo.defaults = {

    from: 0, // the number the element should start at

    to: 100, // the number the element should end at

    speed: 1000, // how long it should take to count between the target numbers

    refreshInterval: 100, // how often the element should be updated

    decimals: 0, // the number of decimal places to show

    onUpdate: null, // callback method for every time the element is updated,

    onComplete: null // callback method for when the element finishes updating

  };
})(jQuery);

// open modal video

$(function () {

  $(".js-video-modal").on("click", function (e) {

    e.preventDefault();

    var youtubeId = $(this).data("youtubeId"),
        modal = $(this).data("modal") || ".md-video";

    $(modal).find("iframe").attr("src", `https://www.youtube.com/embed/${youtubeId}?autoplay=1`);

    $(modal).modal("show");
  });

  $(".md-video").on("hide.bs.modal", function () {

    $(this).find("iframe").attr("src", "");
  });
});

$(function () {

  $(".js-show-360").on("click", function (e) {

    e.preventDefault();

    $("body").addClass("overflow-hidden");

    $(".n-popup-360").addClass("show");
  });

  $(".js-show-video").on("click", function (e) {

    e.preventDefault();

    var videoId = $(this).data("videoId");

    var vw = $(window).outerWidth();

    var vh = $(window).outerHeight();

    $("body").addClass("overflow-hidden");

    $(".n-popup-video").find("iframe").attr("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`).attr("width", vw).attr("height", vh);

    $(".n-popup-video").addClass("show");
  });

  $(".js-show-adjust").on("click", function (e) {

    e.preventDefault();

    $("body").addClass("overflow-hidden");

    $(".n-popup-adjust").addClass("show");

    colorSliders.map(function (slider) {

      slider.update();
    });
  });

  $(".js-show-dimming").on("click", function (e) {

    e.preventDefault();

    $("body").addClass("overflow-hidden");

    $(".n-popup-dimming").addClass("show");

    colorSliders.map(function (slider) {

      slider.update();
    });
  });

  $(".n-popup__close").on("click", function (e) {

    e.preventDefault();

    $("body").removeClass("overflow-hidden");

    $(this).closest(".n-popup").removeClass("show");

    $(".n-popup-video").find("iframe").attr("src", "");
  });
});

$(function () {

  $(window).on("resize", function () {

    var vw = $(this).outerWidth();

    var vh = $(this).outerHeight();

    $(".n-popup-video").find("iframe").attr("width", vw).attr("height", vh);
  });
});

$(function () {

  $(".color-slider").each(function () {

    var $container = $(this),
        $sliderEl = $container.find(".swiper-container"),
        length = $container.find(".swiper-slide").length,
        control = $container.data("control");

    var slider = new Swiper($sliderEl, {

      effect: "fade",

      allowTouchMove: false

    });

    colorSliders.push(slider);

    $(control).on("input change", function () {

      var val = $(this).val();

      var index = Math.floor(val * length / 100);

      slider.slideTo(index);
    });
  });
});

$(function () {

  $(".js-show-map").on("click", function (e) {

    e.preventDefault();

    var $btn = $(this);

    var name = $btn.data("name");

    var lat = $btn.data("lat");

    var lng = $btn.data("lng");

    var address = $btn.data("address");

    $(".md-map").modal("show");

    switch (true) {

      case Boolean(lat && lng):

        var place = {

          name: name,

          geometry: {

            location: {

              lat: lat,

              lng: lng

            }

          }

        };

        createMarker(place);

        map.setCenter(place.geometry.location);

        break;

      case Boolean(address):

        var request = {

          query: address,

          fields: ["name", "geometry"]

        };

        queryPlace(request);

        break;

      default:

    }
  });
});

$(function () {

  $(".md-pos").modal({

    show: true,

    backdrop: "static",

    keyboard: false

  });
});

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var map;
var service;
var infowindow;

function initMap() {
  var rangdong = new google.maps.LatLng(20.990545, 105.807578);
  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: rangdong,
    zoom: 15
  });

  var request = {
    query: "Công ty Cổ phần Bóng đèn Phích nước Rạng Đông, Phố Hạ Đình, Thanh Xuân Trung, Thanh Xuân, Hà Nội",
    fields: ["name", "geometry"]
  };

  // 20.990663, 105.807560

  queryPlace(request);
}

function queryPlace(request) {
  service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}