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

$(function () {
  addSwiper(".card-slider", {
    navigation: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });
});

$(function () {
  addSwiper(".card-slider-2", {
    navigation: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 24,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });
});

$(function () {
  var aboutSlider = addSwiper(".about-slider", {
    init: false,
    slidesPerView: 1.6,
    spaceBetween: 8,
    speed: 1000,
    navigation: true,
    centeredSlides: true
  })[0];

  if (!aboutSlider) {
    return;
  }

  aboutSlider.on("init", function () {
    aboutSlider.slideTo(1, 0);
  });

  aboutSlider.init();
});

$(function () {
  addSwiper(".banner-slider", {
    effect: "fade",
    speed: 1000,
    loop: true,
    autoHeight: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      type: "fraction"
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
        clickable: true,
        type: options.pagination.type || "bullets"
      };
    }

    return new Swiper($sliderEl, options);
  });
}

// youtube video api

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");
var firstScriptTag = document.getElementsByTagName("script")[0];
var player;

tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  var homeVideo = document.getElementById("home-video");

  if (!homeVideo) {
    return;
  }

  var videoId = homeVideo.dataset.videoId;

  player = new YT.Player("home-video", {
    height: "322",
    width: "573",
    videoId: videoId,
    playerVars: {
      rel: false,
      controls: true,
      playsinline: "1",
      allowfullscreen: false
    },
    events: {
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    player.stopVideo();
  }
}

// common.js
$(function () {
  if ($(window).width() > 1200) {
    $('meta[name="viewport"]').prop("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
  }
});

// vietnam map
$(function () {
  var vietnamMapData = [{ label: "lai-chau", x: 13.2506, y: 10.4928 }, { label: "lao-cai", x: 22.7768, y: 10.3889 }, { label: "ha-giang", x: 31.4923, y: 8.2592 }, { label: "cao-bang", x: 44.6668, y: 8.1553 }, { label: "lang-son", x: 49.4299, y: 13.3497 }, { label: "bac-kan", x: 41.7279, y: 11.1681 }, { label: "tuyen-quang", x: 34.7352, y: 11.6356 }, { label: "yen-bai", x: 28.0466, y: 14.025 }, { label: "dien-bien", x: 12.2371, y: 14.3886 }, { label: "son-la", x: 20.5473, y: 17.2975 }, { label: "phu-tho", x: 33.9245, y: 17.2456 }, { label: "vinh-phuc", x: 38.9916, y: 16.7261 }, { label: "thai-nguyen", x: 41.9306, y: 14.7003 }, { label: "bac-giang", x: 50.7474, y: 16.7781 }, { label: "quang-ninh", x: 57.5374, y: 17.7131 }, { label: "bac-ninh", x: 45.0722, y: 18.3364 }, { label: "ha-noi", x: 40.7145, y: 19.1675 }, { label: "hoa-binh", x: 37.2688, y: 21.0375 }, { label: "ha-nam", x: 43.248, y: 21.9725 }, { label: "hung-yen", x: 44.5655, y: 20.2584 }, { label: "hai-duong", x: 47.9098, y: 19.635 }, { label: "hai-phong", x: 51.1528, y: 20.4662 }, { label: "thai-binh", x: 48.4165, y: 21.9206 }, { label: "nam-dinh", x: 47.0991, y: 23.7387 }, { label: "ninh-binh", x: 43.1467, y: 23.9984 }, { label: "thanh-hoa", x: 37.1675, y: 25.0892 }, { label: "nghe-an", x: 31.7963, y: 30.0239 }, { label: "ha-tinh", x: 40.5118, y: 36.1015 }, { label: "quang-binh", x: 47.8085, y: 41.3998 }, { label: "quang-tri", x: 54.5984, y: 45.6073 }, { label: "thua-thien-hue", x: 61.2871, y: 48.5681 }, { label: "da-nang", x: 68.6851, y: 50.1784 }, { label: "quang-nam", x: 66.9622, y: 53.5548 }, { label: "kon-tum", x: 66.4555, y: 59.1129 }, { label: "quang-ngai", x: 74.867, y: 57.0351 }, { label: "gia-lai", x: 71.1173, y: 64.4112 }, { label: "binh-dinh", x: 79.1234, y: 62.4373 }, { label: "phu-yen", x: 80.5422, y: 68.7746 }, { label: "dak-lak", x: 71.1173, y: 71.4757 }, { label: "khanh-hoa", x: 78.718, y: 73.6574 }, { label: "ninh-thuan", x: 78.11, y: 77.709 }, { label: "dak-nong", x: 63.4153, y: 74.4365 }, { label: "lam-dong", x: 69.9012, y: 77.3974 }, { label: "binh-thuan", x: 65.8475, y: 81.7088 }, { label: "binh-phuoc", x: 53.889, y: 78.0207 }, { label: "tay-ninh", x: 43.9574, y: 79.4752 }, { label: "binh-duong", x: 50.6461, y: 80.6699 }, { label: "dong-nai", x: 57.3347, y: 82.436 }, { label: "ba-ria-vung-tau", x: 58.3481, y: 84.6696 }, { label: "ho-chi-minh", x: 51.3555, y: 83.7346 }, { label: "long-an", x: 45.1735, y: 83.7865 }, { label: "dong-thap", x: 37.9782, y: 84.0463 }, { label: "an-giang", x: 32.607, y: 85.241 }, { label: "kien-giang", x: 33.3164, y: 88.9291 }, { label: "can-tho", x: 37.4715, y: 87.5785 }, { label: "tien-giang", x: 44.7682, y: 85.7604 }, { label: "ben-tre", x: 49.4299, y: 87.3707 }, { label: "tra-vinh", x: 46.5923, y: 89.4485 }, { label: "soc-trang", x: 42.2346, y: 91.1107 }, { label: "bac-lieu", x: 36.5594, y: 92.6171 }, { label: "ca-mau", x: 31.0869, y: 94.3832 }, { label: "hau-giang", x: 38.0796, y: 89.6043 }, { label: "vinh-long", x: 42.944, y: 87.8382 }];

  var province = $(".js-map-marker").data("province");

  vietnamMapData.map(data => {
    if (data.label === province) {
      $(".js-map-marker").css({
        display: "inline-block",
        top: data.y + "%",
        left: data.x + "%"
      });
      return;
    }
  });
});

// calendar news&events page
(function () {
  var $calendar = $("#my-calendar");

  if (!$calendar.length) {
    return;
  }

  var events = [{
    date: "2019-12-10",
    title: "AEON MALL Hadong to be launched in late November",
    location: "Ha Noi",
    showDate: "12",
    showMonth: "DEC",
    showFullDate: "10.11.2019 - 10.12.2019",
    inVietnam: true,
    url: "./event-detail.html"
  }, {
    date: "2019-12-10",
    title: "AEON MALL Hadong to be launched in late November",
    location: "Ho Chi Minh City",
    showDate: "10-11",
    showMonth: "DEC",
    showFullDate: "10.12.2019 - 11.12.2019",
    inVietnam: true,
    url: "./event-detail.html"
  }, {
    date: "2019-12-11",
    title: "AEON MALL Hadong to be launched in late November",
    location: "Ho Chi Minh City",
    showDate: "10-11",
    showMonth: "DEC",
    showFullDate: "10.12.2019 - 11.12.2019",
    inVietnam: true,
    url: "./event-detail.html"
  }, {
    date: "2019-12-10",
    title: "AEON MALL Hadong to be launched in late November",
    location: "Singapore",
    showDate: "10-12",
    showMonth: "DEC",
    showFullDate: "10.12.2019 - 12.12.2019",
    inVietnam: false,
    url: "./event-detail.html"
  }, {
    date: "2019-12-11",
    title: "AEON MALL Hadong to be launched in late November",
    location: "Singapore",
    showDate: "10-12",
    showMonth: "DEC",
    showFullDate: "10.12.2019 - 12.12.2019",
    inVietnam: false,
    url: "./event-detail.html"
  }, {
    date: "2019-12-12",
    title: "AEON MALL Hadong to be launched in late November",
    location: "Singapore",
    showDate: "10-12",
    showMonth: "DEC",
    showFullDate: "10.12.2019 - 12.12.2019",
    inVietnam: false,
    url: "./event-detail.html"
  }];
  var calendarEvent = $calendar.html();

  $(document).on("click", ".js-close-event", function () {
    $(".calendar-event").removeClass("show");
  });

  $calendar.clndr({
    events: events,
    clickEvents: {
      click: function (target) {
        if (target.events.length) {
          changeEvent(target.events);
          $(".calendar-event").addClass("show");
        }
      }
    },
    adjacentDaysChangeMonth: true
  });

  function changeEvent(events) {
    var ul = document.createElement("ul");
    ul.classList = "list-unstyled mb-0";
    events.map(item => {
      var li = document.createElement("li");
      li.classList = "py-1";
      var wrap = document.createElement("div");
      wrap.classList = "p-2 border";

      var content = `
<a class="event media text-default d-flex" href="${item.url}" >
  <div class="event__time ${item.inVietnam ? "bg-primary" : "bg-info"}">
    <div>${item.showDate}</div>
    <div>${item.showMonth}</div>
  </div>
  <div class="event__body media-body">
    <h3 class="event__title"><span class="text-600 ${item.inVietnam ? "text-primary" : "text-info"}">${item.location}</span> | ${item.showFullDate}</h3>
    <div class="event__desc">${item.title}</div>
  </div>
</a>
`;

      wrap.innerHTML = content;
      li.appendChild(wrap);
      ul.appendChild(li);
    });
    $(".js-calendar-content").html(ul);
  }

  $calendar.append(calendarEvent);
})();

// file input
$(function () {
  $(".js-file-input").on("change", function () {
    var fileName = $(this).val().split(/\\|\//).pop();

    $(this).closest(".js-file").find(".js-file-text").text(fileName);

    var target = $(this).data("target");
    if (target) {
      readURL(this, target);
    }
  });

  function readURL(input, target) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(target).show();
        $(target).attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
});

$(function () {
  $(".required__input, .required__textarea").on("change blur", function () {
    const val = $(this).val();
    const $placeholder = $(this).siblings(".required__placeholder");

    if (val === "") {
      $placeholder.show();
    } else {
      $placeholder.hide();
    }
  }).on("keydown", function () {
    $(this).siblings(".required__placeholder").hide();
  });

  $(".required__select").on("change", function () {
    const val = $(this).val();
    const $placeholder = $(this).siblings(".required__placeholder");

    if (val === "") {
      $placeholder.show();
    } else {
      $placeholder.hide();
    }
  });
});