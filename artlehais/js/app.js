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
        if ($(window).width() >= 1200) return;

        $navbar.addClass('is-show');
        $body.addClass('overflow-hidden');
    });

    $navbarClose.on('click', function () {
        $navbar.removeClass('is-show');
        $body.removeClass('overflow-hidden');
    });
});

$(function () {
    addSwiper('.banner-slider', {
        pagination: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false
        },
        autoHeight: true,
        speed: 600,
        loop: true
    });
});

$(function () {
    addSwiper('.product-slider', {
        navigation: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false
        },
        spaceBetween: 30,
        speed: 600,
        loop: true,
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
    if (!$('.preview-slider, .thumb-slider').length) {
        return;
    }

    if (!window.addSwiper) {
        console.warn('"addSwiper" funtion is required!');
        return;
    }

    var thumbSlider = addSwiper('.thumb-slider', {
        slidesPerView: 4,
        freeMode: true,
        spaceBetween: 10,
        watchSlidesProgress: true,
        watchSlidesVisibility: true
    })[0];

    addSwiper('.preview-slider', {
        effect: 'fade',
        allowTouchMove: false,
        thumbs: {
            swiper: thumbSlider
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
    $(".as-menu__toggle").on("click", function () {
        $(this).toggleClass('active');
        $(this).siblings(".as-menu__sub").slideToggle();
    });
});

$(function () {
    $('.js-radio-group-btn').on('change', function () {
        var $el = $(this);
        var $item = $el.closest('.radio-group__item');
        var $desc = $item.find('.radio-group__desc');
        var $otherDesc = $item.siblings('.radio-group__item').find('.radio-group__desc');

        if ($desc) {
            $desc.slideDown();
        }

        if ($otherDesc) {
            $otherDesc.slideUp();
        }
    });
});

$(function () {
    $('.js-show-popup').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $btn = $(this);
        var $otherBtn = $('.js-show-popup').not($btn);
        var target = $btn.data('target');
        var $otherDropdown = $('.h-dropdown').not($(target));
        var holdTarget = $btn.data('holdTarget');

        $btn.addClass('active');

        if (!holdTarget) {
            $otherBtn.removeClass('active');
        }

        $(target).fadeIn();
        $otherDropdown.hide();

        manipulateBtns(target);
    });

    $('.h-dropdown').on('click', function (e) {
        e.stopPropagation();
    });

    $('html, body').on('click', hidePopups);

    function hidePopups() {
        $('.h-dropdown').hide();
        $('.js-show-popup').removeClass('active');
    }
});

$(function () {
    $('.pd-menu__link').on('click', function () {
        var $btn = $(this);
        var $subMenu = $btn.siblings('.pd-menu__sub');

        if (!$subMenu[0]) return;

        var $otherItem = $btn.closest('.pd-menu__item').siblings('.pd-menu__item');

        $subMenu.toggle();

        if ($subMenu.hasClass('pd-menu__sub--scroll')) {
            $subMenu.toggleClass('js-scroll-target');
        }

        $btn.toggleClass('active');
        $otherItem.find('.pd-menu__link').removeClass('active');
        $otherItem.find('.pd-menu__sub').removeClass('js-scroll-target').hide();
    });
});

function manipulateBtns(target) {
    var $dropdown = $(target);
    var $body = $dropdown.find('.js-scroll-target');
    var $scrollUp = $dropdown.find('.js-scroll-up');
    var $scrollDown = $dropdown.find('.js-scroll-down');

    if (!$body.length) return;

    var bodyEl = $body.get(0);

    if (!checkOffset(bodyEl)) return;

    toggleBtn();

    $body.on('scroll', toggleBtn);

    $scrollUp.on('click', function () {
        console.log('Up');
        bodyEl.scrollTop = bodyEl.scrollTop - 100;
    });

    $scrollDown.on('click', function () {
        console.log('Down');
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