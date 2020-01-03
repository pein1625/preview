$(document).ready(function () {
  $(".js-audio-btn").on("click", function () {
    $(this).siblings(".js-audio").trigger("play");
  });

  $(".js-datepicker").datepicker({
    format: "DD, MM d, yyyy"
  });
  $(".js-clockpicker").clockpicker({
    donetext: '完了',
    afterDone: function () {
      var time = $(".js-clockpicker").val().split(":");
      hour = parseInt(time[0]), minute = parseInt(time[1]), ampm = hour >= 12 ? "PM" : "AM";

      hour = hour % 12;
      hour = ampm == "AM" || hour ? hour : 12;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;

      var strTime = hour + ":" + minute + " " + ampm;
      $(".js-clockpicker").val(strTime);
    }
  });

  $(".js-panel-toggle").on("click", function () {
    $(this).closest(".panel").toggleClass("hide");
  });

  if ($(".js-banner-slider").length) {
    $(".js-banner-slider").each(function () {
      var sliderEl = $(this).find(".swiper-container").get(0),
          prevEl = $(this).find(".banner-slider__prev").get(0),
          nextEl = $(this).find(".banner-slider__next").get(0);

      new Swiper(sliderEl, {
        slidesPerView: 1,
        speed: 800,
        autoplay: {
          delay: 3500
        },
        loop: true,
        effect: 'fade',
        navigation: {
          prevEl: prevEl,
          nextEl: nextEl
        }
      });
    });
  }

  $(".js-md-banner-slider").each(function () {
    var sliderEl = $(this).get(0);
    var pagingEl = $(this).find(".md-banner-slider__paging");

    new Swiper(sliderEl, {
      autoplay: {
        delay: 2500
      },
      nested: true,
      loop: true,
      speed: 500,
      pagination: {
        el: pagingEl,
        clickable: true
      }
    });
  });

  $(".md-car-slider").each(function () {
    var sliderEl = $(this).find(".js-md-car-slider").get(0),
        prevEl = $(this).find(".md-car-slider__prev").get(0),
        nextEl = $(this).find(".md-car-slider__next").get(0);

    new Swiper(sliderEl, {
      loop: true,
      navigation: {
        prevEl: prevEl,
        nextEl: nextEl
      }
    });
  });

  $(".js-modal-car").on("shown.bs.modal", function () {
    var bannerSlider = $(".js-md-banner-slider"),
        carSlider = $(".js-md-car-slider").get(0),
        id = $(this).find(".md-car__id").val();
    id = parseInt(id), slides = $(".js-info-slide"), activeSlide = $('.js-info-slide[data-id="' + id + '"]'), index = $(slides).index(activeSlide);

    if (carSlider && carSlider.swiper && carSlider.swiper.update) {
      carSlider.swiper.update();
      carSlider.swiper.slideTo(index, 0);
    }

    for (let i = 0, l = bannerSlider.length; i < l; i++) {
      if (bannerSlider[i].swiper && bannerSlider[i].swiper.update) {
        bannerSlider[i].swiper.update();
      }
    }
  });

  $(document).on("click", function (e) {
    var target = e.target;
    var modalBtn = $(target).closest(".js-modal-car-btn");
    var hearseBtn = $(target).closest(".js-car");
    var pickCarBtn = $(target).closest(".js-pick-car");

    if (modalBtn.length) {
      let id = $(modalBtn).data("id");
      $(".js-modal-car .md-car__id").val(id);
      setTimeout(function () {
        $(".js-modal-car").modal("show");
      }, 100);
    } else if (hearseBtn.length) {
      let id = $(hearseBtn).data("id");
      chosenPlace(id);
    } else if (pickCarBtn.length) {
      let id = $(pickCarBtn).data("id");
      $(".js-modal-car").modal("hide");
      chosenPlace(id);
    }
  });
});

// disable/enable button
function toggleBtn(elem, state) {
  if (!elem) {
    return;
  }
  switch (state) {
    case "toggle":
      $(elem).toggleClass("disabled");
      if ($(elem).hasClass("disabled")) {
        $(elem).prop("disabled", true);
      } else {
        $(elem).prop("disabled", false);
      }
      break;
    case "disable":
      $(elem).addClass("disabled");
      $(elem).prop("disabled", false);
      break;
    case "enable":
      $(elem).removeClass("disabled");
      $(elem).prop("disabled", false);
      break;
    default:
      break;
  }
}