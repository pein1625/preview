// navbar mobile toggle
$(function () {
  var $body = $('html, body');
  var $navbar = $('.js-navbar');

  $('.js-navbar-open').on('click', function () {
    $navbar.addClass('is-show');
    $body.addClass('overflow-hidden');
  });

  $('.js-navbar-close').on('click', function () {
    $navbar.removeClass('is-show');
    $body.removeClass('overflow-hidden');
  });
});

// menu toggle
$(function () {
  $('.menu-toggle').on('click', function () {
    var $toggle = $(this);

    $toggle.toggleClass('active').siblings('.menu-sub').slideToggle();

    $toggle.parent().siblings('.menu-item-group').children('.menu-sub').slideUp();

    $toggle.parent().siblings('.menu-item-group').children('.menu-toggle').removeClass('active');
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
    slidesPerView: 5,
    freeMode: true,
    spaceBetween: 16,
    navigation: true,
    breakpoints: {
      576: {
        slidesPerView: 4,
        spaceBetween: 8
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

// testimonial sync
$(function () {
  $('.customer-comments').slick({
    arrows: false,
    asNavFor: '.customer-avatars, .customer-info',
    fade: true,
    adaptiveHeight: true
  });

  $('.customer-avatars').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.customer-comments, .customer-info',
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true
  });

  $('.customer-info').slick({
    arrows: false,
    asNavFor: '.customer-comments, .customer-avatars',
    fade: true,
    adaptiveHeight: true
  });
});

// product-slider
$(function () {
  addSwiper('.product-slider', {
    navigation: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 800,
    loop: true,
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 16
      },
      575: {
        spaceBetween: 16,
        slidesPerView: 2
      }
    }
  });
});

// video-slider
$(function () {
  addSwiper('.video-slider', {
    navigation: true,
    slidesPerView: 2,
    spaceBetween: 30,
    speed: 800,
    loop: true,
    breakpoints: {
      575: {
        slidesPerView: 1
      }
    }
  });
});

// banner-slider
$(function () {
  addSwiper('.banner-slider', {
    navigation: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    loop: true
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find('.swiper-container');

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

// input group quantity
$(function () {
  numberInput('.js-quantity-value');

  $('.js-quantity-btn').on('click', function () {
    var plus = $(this).data('plus');
    var input = $(this).closest('.js-quantity').find('.js-quantity-value');
    var value = input.val();
    var newValue = parseInt(value) + plus;

    if (newValue > 0) {
      input.val(newValue);
      input.trigger('change');
    }
  });
});

$(function () {
  $('.js-cart-quantity, .js-cart-papertype').on('change', function () {
    var total = 0;
    $('.js-cart-row').each(function () {
      var quantity = $(this).find('.js-cart-quantity').val();
      var papertype = $(this).find('.js-cart-papertype').val();
      var unitPrice;
      var prices = $(this).find('.js-cart-quantity').data('price');

      quantity = parseInt(quantity) || 0;
      paperPrice = parseInt(papertype) || 0;

      switch (true) {
        case quantity <= 100:
          unitPrice = prices[0] + paperPrice;
          break;
        case quantity <= 300:
          unitPrice = prices[1] + paperPrice;
          break;
        case quantity <= 500:
          unitPrice = prices[2] + paperPrice;
          break;
        case quantity <= 1000:
          unitPrice = prices[3] + paperPrice;
          break;
        default:
          unitPrice = prices[4] + paperPrice;
      }

      $(this).find('.js-cart-unitprice').html(`${unitPrice.toLocaleString('en')}`);
      $(this).find('.js-cart-price').html(`${(unitPrice * quantity).toLocaleString('en')}`);

      total += unitPrice * quantity;
    });

    $('.js-cart-totalprice').html(total.toLocaleString('en'));
  });
});

$(function () {
  $('.js-detail-input, .js-paper-type').on('change', function () {
    updateDetailPrice();
  });
});

function updateDetailPrice() {
  var val = $('.js-detail-input').val();
  var prices = $('.js-detail-input').data('price');
  var unitPrice = prices[0];
  var paperPrice = $('.js-paper-type:checked').val();

  val = parseInt(val);
  paperPrice = parseInt(paperPrice);

  switch (true) {
    case val <= 100:
      unitPrice = prices[0] + paperPrice;
      break;
    case val <= 300:
      unitPrice = prices[1] + paperPrice;
      break;
    case val <= 500:
      unitPrice = prices[2] + paperPrice;
      break;
    case val <= 1000:
      unitPrice = prices[3] + paperPrice;
      break;
    default:
      unitPrice = prices[4] + paperPrice;
  }

  $('.js-detail-price').html((val * unitPrice).toLocaleString('en'));
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

// open modal video
$(function () {
  $('.js-video-modal').on('click', function (e) {
    e.preventDefault();

    var youtubeId = $(this).data('youtubeId'),
        modal = $(this).data('modal') || '.md-video';

    $(modal).find('iframe').attr('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1`);
    $(modal).modal('show');
  });

  $('.md-video').on('hide.bs.modal', function () {
    $(this).find('iframe').attr('src', '');
  });
});

// open video switch
$(function () {
  $('.js-video-switch').on('click', function (e) {
    e.preventDefault();

    var target = $(this).data('target') || '.js-video-switch-target',
        youtubeId = $(this).data('youtubeId');

    $(target).find('iframe').attr('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1`);
  });
});

function updateSkeleton({ top, left, width, height, rotate }, hasBtns = false) {
  var $skeleton = $('.skeleton');

  if (!$skeleton.length) {
    return;
  }

  $skeleton.show().css({
    top,
    left,
    width,
    height,
    transform: `rotate(${rotate}) translate(-50%, -50%)`
  });

  if (hasBtns) {
    $('.skeleton__resize, .skeleton__rotate').show();
  } else {
    $('.skeleton__resize, .skeleton__rotate').hide();
  }
}

function removeSkeleton() {
  $('.skeleton').hide();
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

const Design = function () {
  this.boards = [];
  this.container = document.querySelector('.design__boards');
  this.focusBoard = null;
  this.focusBox = null;

  this.addBoard = board => {
    if (!this.boards.length) {
      this.focusBoard = board;
    }

    this.boards.push(board);
    this.container.appendChild(board.el);
    board.design = this;
    board.attachEvent();
  };

  this.deleteBoard = boardId => {
    this.boards = this.boards.filter(board => {
      if (board.id === boardId) {
        board.el.remove();
        return false;
      }

      return true;
    });
  };

  this.addBox = box => {
    this.focusBoard.addBox(box);
  };
};

const Board = function () {
  let count = 0;

  return function (data) {
    let boardEl = document.createElement('div');
    let headerEl = document.createElement('div');
    let bodyEl = document.createElement('div');
    let removeEl = document.createElement('a');

    count++;

    boardEl.classList.add('board');
    boardEl.dataset.id = count;
    headerEl.classList.add('board__header');
    bodyEl.classList.add('board__body');
    removeEl.classList.add('board__btn');
    removeEl.attributes.href = '#!';
    removeEl.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3.25h2c.69 0 1.25.56 1.25 1.25V5h-4.5v-.5c0-.69.56-1.25 1.25-1.25zM6.5 5v-.5A2.5 2.5 0 0 1 9 2h2a2.5 2.5 0 0 1 2.5 2.5V5h3.375a.625.625 0 1 1 0 1.25H16V15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6.25h-.875a.625.625 0 1 1 0-1.25H6.5zm7 1.25H5.25V15c0 .966.784 1.75 1.75 1.75h6A1.75 1.75 0 0 0 14.75 15V6.25H13.5zM8.125 8h-.25v6h1.25V8h-1zm2.75 1V8h1.25v6h-1.25V9z" fill="currentColor"></path>
      </svg>
    `;

    headerEl.appendChild(removeEl);
    boardEl.appendChild(headerEl);
    boardEl.appendChild(bodyEl);

    this.id = count;
    this.boxId = 1;
    this.zIndex = 1;
    this.el = boardEl;
    this.bodyEl = bodyEl;
    this.removeEl = removeEl;
    this.boxes = [];
    this.design = null;
    this.background = null;

    this.attachEvent = () => {
      if (this.design) {
        this.removeEl.onclick = () => this.design.deleteBoard(this.id);
      }

      const $content = $('.design__content');

      $content.on('scroll', () => {
        let contentOffsetTop = $content.offset().top;
        let offsetTop = $(this.el).offset().top;
        let contentHeight = $content.outerHeight();
        let height = $(this.el).outerHeight();

        if (offsetTop < contentOffsetTop + contentHeight / 2 && offsetTop + height > contentOffsetTop + contentHeight / 2) {
          this.design.focusBoard = this;
        }
      });
    };

    this.getIndex = () => {
      return this.zIndex++;
    };

    this.addBox = box => {
      this.bodyEl.appendChild(box.el);
      box.board = this;
      box.attachEvent();

      if (box.type === 'background') {
        if (this.background) {
          this.background.el.remove();
        }

        this.background = box;
      } else {
        this.boxes.push(box);
      }
    };

    this.deleteBox = boxId => {
      if (this.background && this.background.id === boxId) {
        this.background.el.remove();
        console.log(this.background.el);
        removeSkeleton();
        this.background = null;
      } else {
        this.boxes = this.boxes.filter(box => {
          if (box.id === boxId) {
            box.el.remove();
            removeSkeleton();
            return false;
          }

          return true;
        });
      }
    };
  };
}();

const Box = function () {
  let count = 0;

  return function (data) {
    count++;

    if (!data) {
      console.warn('Box element has no data!');
      return;
    }

    let {
      type = 'text',
      text = null,
      url = null,
      scale = 1,
      rotate = 0,
      top = 0,
      left = 0,
      zIndex = 0,
      color = 'inherit',
      fontFamily = 'inherit',
      fontSize = 'inherit',
      fontWeight = 400,
      fontStyle = 'normal',
      textAlign = 'left',
      textTransform = 'none'
    } = data;

    let box = document.createElement('div');
    let boxContent = document.createElement('div');
    let img = document.createElement('img');

    switch (type) {
      case 'text':
        boxContent.classList.add('box__text');
        boxContent.innerText = text;
        box.style.fontSize = fontSize;
        box.style.fontFamily = fontFamily;
        box.style.fontWeight = fontWeight;
        box.style.fontStyle = fontStyle;
        box.style.color = color;
        box.style.textAlign = textAlign;
        box.style.textTransform = textTransform;
        this.textEl = boxContent;

        break;
      case 'image':
        boxContent.classList.add('box__image');
        boxContent.appendChild(img);
        this.img = img;
        break;
      case 'background':
        box.classList.add('box--bg');
        boxContent.classList.add('box__bg');

        if (url) {
          boxContent.appendChild(img);
          this.img = img;
        }

        if (color) {
          boxContent.style.background = color;
        }
        break;
      default:
        return;
    }

    box.classList.add('box');
    box.dataset = { scale, rotate, top, left };
    box.appendChild(boxContent);

    // properties
    this.id = count;
    this.el = box;
    this.type = type;
    this.text = text;
    this.scale = scale;
    this.rotate = rotate;
    this.top = top;
    this.left = left;
    this.zIndex = zIndex;
    this.style = {
      color,
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      textAlign,
      textTransform
    };
    this.board = null;

    // Methods
    this.attachEvent = () => {
      let el = this.el,
          img = this.img;

      if (img) {
        img.src = url;
      }

      el.addEventListener('mouseenter', e => {
        if (!this.board.design.focusBox) {
          this.updateEl(false);
        }
      });

      el.addEventListener('mouseleave', e => {
        if (!this.board.design.focusBox) {
          removeSkeleton();
        }
      });

      el.addEventListener('mousedown', e => e.stopPropagation());

      el.addEventListener('click', e => {
        e.stopPropagation();

        this.board.design.focusBoard = this.board;
        this.board.design.focusBox = this;

        this.updateEl();

        if (this.type !== 'background') {
          this.dragEl();
          this.rotateEl();
          this.resizeEl();
        }

        if (this.type === 'text') {
          $(`.js-design-tab[href="#design-tab-3"]`).tab('show');
          $('.js-text-input').val(this.text);
          $('.js-text-btn').text('Sửa');
        } else {
          $('.js-text-btn').text('Thêm');
          $('.js-text-input').val('');
        }
      });
    };

    this.float = () => {
      if (!this.board) {
        return;
      }

      this.zIndex = this.board.getIndex();
      this.updateEl();
    };

    this.dragEl = () => {
      var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;

      const dragMouseDown = e => {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      };

      const elementDrag = e => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:
        this.top = this.el.offsetTop - pos2;
        this.left = this.el.offsetLeft - pos1;
        this.updateEl();
      };

      const closeDragElement = () => {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      };

      this.el.onmousedown = dragMouseDown;
    };

    this.rotateEl = () => {
      const dragMouseDown = e => {
        e = e || window.event;
        e.preventDefault();
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        position = e.target.dataset.position;
      };

      const elementDrag = e => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        var mouseX = e.clientX;
        var mouseY = e.clientY;

        var { x, y, width, height } = el.getBoundingClientRect();
        var centerX = x + width / 2;
        var centerY = y + height / 2;

        var w2 = mouseX - centerX;
        var h2 = mouseY - centerY;

        var angle = calcAngle({
          w: width,
          h: height,
          w2: w2,
          h2: h2,
          position: position
        });

        this.rotate = angle;

        this.updateEl();
      };

      const closeDragElement = () => {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      };

      const calcAngle = ({ w, h, w2, h2, position }) => {
        var angle = Math.atan2(h2, w2) * 180 / Math.PI;

        var result = angle - 90;

        // làm tròn result
        switch (true) {
          case Math.abs(result) < 3:
            result = 0;
            break;
          case Math.abs(result - 90) < 3:
            result = 90;
            break;
          case Math.abs(result - 180) < 3:
            result = 180;
            break;
          case Math.abs(result + 90) < 3:
            result = -90;
            break;
          case Math.abs(result + 180) < 3:
            result = -180;
            break;
          default:
            break;
        }

        return result + 'deg';
      };

      var el = this.el;
      var rotateBtn = document.querySelector('.skeleton__rotate');
      rotateBtn.onmousedown = dragMouseDown;
    };

    this.resizeEl = () => {
      const dragMouseDown = e => {
        e = e || window.event;
        e.preventDefault();
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      };

      const elementDrag = e => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        let originWidth = this.el.clientWidth;
        let originHeight = this.el.clientHeight;
        let { x, y, width, height } = this.el.getBoundingClientRect();

        let centerX = x + width / 2;
        let centerY = y + height / 2;

        let scaleX = Math.abs(mouseX - centerX) * 2 / originWidth;
        let scaleY = Math.abs(mouseY - centerY) * 2 / originHeight;

        this.scale = scaleX < scaleY ? scaleY : scaleX;

        this.updateEl();
      };

      const closeDragElement = () => {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      };

      let resizeBtns = document.querySelectorAll('.skeleton__resize');

      Array.from(resizeBtns, function (btn) {
        btn.onmousedown = dragMouseDown;
      });
    };

    this.updateEl = (showSkeletonBtn = true) => {
      let { el, text, top, left, rotate, scale, zIndex, type, style } = this;

      el.style.top = top + 'px';
      el.style.left = left + 'px';
      el.style.zIndex = zIndex;
      el.style.transform = `scale(${scale}) rotate(${rotate})`;

      // text style
      if (type === 'text') {
        el.style.color = style.color;
        el.style.fontFamily = style.fontFamily;
        el.style.fontSize = style.fontSize;
        el.style.fontWeight = style.fontWeight;
        el.style.fontStyle = style.fontStyle;

        this.textEl.innerText = text;
      } else if (type === 'background') {
        el.style.background = style.color;
      }

      this.updateSkeleton(showSkeletonBtn && this.type !== 'background');
    };

    this.delete = () => {
      this.board.deleteBox(this.id);
    };

    this.changeStyle = (style = {}) => {
      this.style = Object.assign({}, this.style, style);

      this.updateEl();
    };

    this.getType = () => this.type;

    this.updateSkeleton = (hasBtns = false) => {
      const { el, rotate, scale } = this;
      const { width, height } = el.getBoundingClientRect();
      const coords = getCoords(el);

      updateSkeleton({
        top: coords.top + height / 2,
        left: coords.left + width / 2,
        width: Math.abs(el.clientWidth * scale),
        height: Math.abs(el.clientHeight * scale),
        rotate
      }, hasBtns);
    };
  };
}();

$(function () {
  $('.js-search-toggle').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.js-search').slideToggle();
  });

  $('.js-search').on('click', function (e) {
    e.stopPropagation();
  });

  $('html, body').on('click', function (e) {
    $('.js-search').slideUp();
  });
});

$(function () {
  $('.js-payment-type').on('change', function () {
    var isChecked = $('.js-bank-select').prop('checked');

    if (isChecked) {
      $('.bank-select').slideDown();
    } else {
      $('.bank-select').slideUp();
    }
  });
});

$(function () {
  $('.js-download-link').on('click', function (e) {
    e.preventDefault();
    var title = $(this).data('title');
    var id = $(this).data('id');

    $('.js-download-title').html(title);
    $('.js-download-id').val(id);
    $('.md-download').modal('show');
  });
});

// init design
$(function () {
  let design = new Design();

  $('.design__btn').on('click', function () {
    design.addBoard(new Board());
  });

  design.addBoard(new Board());

  $('.js-box-float').on('click', function (e) {
    e.stopPropagation();

    if (design.focusBox) {
      design.focusBox.float();
    }
  });

  $('.js-box-delete').on('click', function (e) {
    e.stopPropagation();

    if (design.focusBox) {
      design.focusBox.delete();
    }
  });

  $('.js-add-item').on('click', function (e) {
    e.stopPropagation();
    let data = $(this).data('item');

    addItem(design, data);
  });

  $(document).on('keydown', e => {
    if (e.keyCode === 46 && design.focusBox) {
      design.focusBox.delete();
    }
  });

  $('.design__content').on('click', function () {
    design.focusBox = null;
    $('.js-text-btn').text('Thêm');
    $('.js-text-input').val('');

    removeSkeleton();
  });

  const bgPicker = Pickr.create({
    el: '.bg-picker',
    theme: 'monolith', // or 'monolith', or 'nano'

    swatches: ['#FF5757', '#FF66C4', '#CB6CE6', '#8C52FF', '#5271FF', '#38B6FF', '#5CE1E6', '#7ED957', '#C9E265', '#FFDE59', '#FF914D'],

    components: {
      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        hsva: true,
        cmyk: true,
        input: true,
        clear: true,
        save: true
      }
    }
  });

  bgPicker.on('change', function (color, instance) {
    let hexaColor = color.toHEXA().toString();

    let bg = new Box({
      type: 'background',
      color: hexaColor
    });

    if (design.focusBoard) {
      design.focusBoard.addBox(bg);
    }
  });

  const colorPicker = Pickr.create({
    el: '.color-picker',
    theme: 'monolith', // or 'monolith', or 'nano'

    swatches: ['#FF5757', '#FF66C4', '#CB6CE6', '#8C52FF', '#5271FF', '#38B6FF', '#5CE1E6', '#7ED957', '#C9E265', '#FFDE59', '#FF914D'],

    components: {
      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        hsva: true,
        cmyk: true,
        input: true,
        clear: true,
        save: true
      }
    }
  });

  colorPicker.on('click', function (e) {
    e.stopPropagation();
  });

  colorPicker.on('change', function (color, instance) {
    let hexaColor = color.toHEXA().toString();

    console.log(hexaColor);

    if (design.focusBox && design.focusBox.getType() === 'text') {
      design.focusBox.changeStyle({
        color: hexaColor
      });
    }
  });

  $('.js-upload-image-input').on('change', function () {
    let input = this;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        let designItem = document.createElement('div');
        let img = document.createElement('img');
        let data = {
          type: 'image',
          url: e.target.result
        };

        img.src = e.target.result;
        designItem.classList.add('design-item');
        designItem.classList.add('js-add-item');
        designItem.append(img);

        $('.js-upload-images').append(designItem);

        designItem.addEventListener('click', function (e) {
          addItem(design, data);
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  });

  $('.js-upload-bg-input').on('change', function () {
    let input = this;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        let designItem = document.createElement('div');
        let img = document.createElement('img');
        let data = {
          type: 'background',
          url: e.target.result
        };

        img.src = e.target.result;
        designItem.classList.add('design-item');
        designItem.classList.add('js-add-item');
        designItem.append(img);

        $('.js-upload-bgs').append(designItem);

        designItem.addEventListener('click', function (e) {
          addItem(design, data);
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  });

  $('.js-text-btn').on('click', function (e) {
    e.stopPropagation();

    let text = $('.js-text-input').val();

    if (design.focusBox && design.focusBox.type === 'text') {
      design.focusBox.text = text;
      design.focusBox.updateEl();
    } else {
      addItem(design, {
        type: 'text',
        text: text
      });
    }
  });

  $('.design__content').on('scroll', function () {
    if (design.focusBox) {
      design.focusBox.updateEl();
    }
  });

  $('.js-font-style, .js-font-size, .js-font-family').on('click', function (e) {
    e.stopPropagation();
  });

  $('.js-font-size').on('change', function () {
    let val = $(this).val();

    if (design.focusBox && design.focusBox.getType() === 'text') {
      design.focusBox.changeStyle({
        fontSize: val
      });
    }
  });

  $('.js-font-family').on('change', function () {
    let val = $(this).val();

    if (design.focusBox && design.focusBox.getType() === 'text') {
      design.focusBox.changeStyle({
        fontFamily: val
      });
    }
  });

  $('.js-font-style').on('change', function () {
    if (design.focusBox && design.focusBox.getType() === 'text') {
      let val = $(this).val();
      let style = {};

      switch (val) {
        case 'bold':
          style = {
            fontWeight: 700,
            fontStyle: 'normal'
          };
          break;
        case 'italic':
          style = {
            fontWeight: 400,
            fontStyle: 'italic'
          };
          break;
        case 'bolditalic':
          style = {
            fontWeight: 700,
            fontStyle: 'italic'
          };
          break;
        default:
          style = {
            fontWeight: 400,
            fontStyle: 'normal'
          };
          break;
      }

      design.focusBox.changeStyle(style);
    }
  });

  $('.js-design-download').on('click', function (e) {
    e.stopPropagation();

    convert2Image(design, download);
  });

  $('.js-design-addcart').on('click', function (e) {
    e.stopPropagation();

    if (window.addCart) {
      convert2Image(design, window.addCart);
    }
  });
});

function addItem(design, data) {
  design.addBox(new Box(data));
}

function convert2Image(design, cb) {
  (async function () {
    let images = await Promise.all(design.boards.map(function (board) {
      return domtoimage.toPng(board.bodyEl);
    }));

    cb(images);
  })();
}

function download(images) {
  images.map(function (image) {
    let link = document.createElement('a');
    link.href = image;
    link.download = 'Download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}