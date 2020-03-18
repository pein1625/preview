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

function addTemp(id) {
    const temps = JSON.parse(localStorage.designs);

    const data = temps[id];

    design = new Design(data);
    removeSkeleton();
}

function addItem(data = {}) {
    const { type, url } = data;

    if (type == 'image' && url && design.focusBox && design.focusBox.data.type == 'image') {
        return design.focusBox.updateEl({
            url
        });
    }

    const box = new Box(data);

    design.focusBoard.addBox(box, () => box.float());
}

function convert2Image(cb) {
    if (!design) {
        return;
    }

    (async function () {
        let images = await Promise.all(design.boards.map(function (board) {
            return domtoimage.toJpeg(board.bodyEl);
        }));

        cb(images);
    })();
}

function download(images) {
    images.map(function (image) {
        let link = document.createElement("a");
        link.href = image;
        link.download = "Download.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

function getDesignData() {
    return design && design.exportData();
}

function setSizeValue(size) {
    $('.js-size-width').val(size.width);
    $('.js-size-height').val(size.height);
}

function createBoxNode(data = {}) {
    const box = document.createElement("div");
    const boxWrapper = document.createElement("div");
    const boxContent = document.createElement("div");
    const boxImg = document.createElement("img");

    boxWrapper.classList.add("box__wrapper");

    switch (data.type) {
        case "text":
            boxContent.classList.add("box__text");
            break;
        case "image":
            boxContent.classList.add("box__image");
            boxContent.appendChild(boxImg);
            break;
        case "background":
            box.classList.add("box--bg");
            boxContent.classList.add("box__bg");
            if (data.url) {
                boxContent.appendChild(boxImg);
            }
            if (data.color) {
                boxContent.style.background = data.color;
            }
            break;
        default:
            return;
    }

    box.classList.add("box");
    boxWrapper.appendChild(boxContent);
    box.appendChild(boxWrapper);

    return {
        box: box,
        boxWrapper: boxWrapper,
        boxContent: boxContent,
        boxImg: boxImg
    };
}

function createBoardNode() {
    const boardEl = document.createElement("div");
    const headerEl = document.createElement("div");
    const bodyEl = document.createElement("div");
    const removeEl = document.createElement("a");

    boardEl.classList.add("board");
    headerEl.classList.add("board__header");
    bodyEl.classList.add("board__body");
    removeEl.classList.add("board__btn");
    removeEl.attributes.href = "#!";
    removeEl.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3.25h2c.69 0 1.25.56 1.25 1.25V5h-4.5v-.5c0-.69.56-1.25 1.25-1.25zM6.5 5v-.5A2.5 2.5 0 0 1 9 2h2a2.5 2.5 0 0 1 2.5 2.5V5h3.375a.625.625 0 1 1 0 1.25H16V15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6.25h-.875a.625.625 0 1 1 0-1.25H6.5zm7 1.25H5.25V15c0 .966.784 1.75 1.75 1.75h6A1.75 1.75 0 0 0 14.75 15V6.25H13.5zM8.125 8h-.25v6h1.25V8h-1zm2.75 1V8h1.25v6h-1.25V9z" fill="currentColor"></path>
      </svg>
    `;

    headerEl.appendChild(removeEl);
    boardEl.appendChild(headerEl);
    boardEl.appendChild(bodyEl);

    return {
        el: boardEl,
        bodyEl: bodyEl,
        removeEl: removeEl
    };
}

function clearLocalDesigns() {
    localStorage.designs = "{}";
}

function onFocusBox(data) {
    $('.js-tool-specific').removeClass('image background text origin').addClass(data.type);
    $(".js-text-input").val(data.text);
    $(".js-text-btn").text(data.type === "text" ? "Sửa" : "Thêm");
    $('.js-tool-common').show();
    $(".js-font-family").val(data.fontFamily);
    $(".js-font-size").val(data.fontSize);
    $(".js-font-style").val(data.fontStyle);
    $('.js-image-shape').val(data.shape);
    $('.js-image-fit').val(data.fit);

    if (colorPicker) {
        colorPicker.setColor(data.color);
    }

    switch (data.type) {
        case "text":
            $(`.js-design-tab[href="#design-tab-text"]`).tab("show");
            break;
        case "image":
            $(`.js-design-tab[href="#design-tab-image"]`).tab("show");
            break;
        case "background":
            $(`.js-design-tab[href="#design-tab-background"]`).tab("show");
            break;
        default:
            break;
    }
}

function onReleaseFocusBox() {
    if (design) {
        design.focusBox = null;
    }

    $(".js-text-btn").text("Thêm");
    $(".js-text-input").val("");
    $(".js-tool-specific").removeClass('image text background origin');
    $('.js-tool-common').hide();
    removeSkeleton();
}

function saveDesign() {
    const currentDesign = getDesignData();

    if (!currentDesign) {
        return;
    }

    const id = currentDesign.id;

    if (!localStorage.designs) {
        localStorage.designs = "{}";
    }

    let designs = JSON.parse(localStorage.designs);

    designs[id] = currentDesign;

    convert2Image(function (images) {
        designs[id].images = images;
        localStorage.designs = JSON.stringify(designs);

        alert('Đã lưu thiết kế!');
    });
}

const Design = function (inputData = {}) {
    const defaultData = {
        size: {
            width: 20,
            height: 10
        },
        id: new Date().getTime()
    };

    this.boards = [];
    this.container = document.querySelector(".design__boards");
    this.focusBoard = null;
    this.focusBox = null;
    this.data = Object.assign({}, defaultData, inputData);

    this.setSize = size => {
        width = parseFloat(size.width) || 0;
        height = parseFloat(size.height) || 0;

        this.data.size = {
            width,
            height
        };

        this.boards.map(board => {
            board.setSize();
        });

        setSizeValue(this.data.size);
    };

    this.addBoard = board => {
        if (!this.boards.length) {
            this.focusBoard = board;
        }

        board.design = this;
        board.setSize();
        board.attachEvent();
        board.addBoxes();

        this.boards.push(board);
        this.container.appendChild(board.el);
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

    this.exportData = () => this.boards.length ? {
        id: this.data.id,
        size: this.data.size,
        boards: this.boards && this.boards.map(board => board.exportData())
    } : null;

    setSizeValue(this.data.size);

    this.container.innerHTML = "";

    if (this.data.boards) {
        this.data.boards.map(board => {
            this.addBoard(new Board(board));
        });
    }
};

const Board = function () {
    let count = 0;

    return function (inputData = {}) {
        count++;

        const defaultData = {
            size: {
                width: 20,
                height: 10
            }
        };

        this.data = Object.assign({}, defaultData, inputData);
        this.id = count;
        this.boxId = 1;
        this.zIndex = 1;
        this.boxes = [];
        this.design = null;
        this.background = null;

        const boardNode = createBoardNode(this.data);

        this.el = boardNode.el;
        this.bodyEl = boardNode.bodyEl;
        this.removeEl = boardNode.removeEl;

        this.attachEvent = () => {
            if (this.design) {
                this.removeEl.onclick = () => this.design.deleteBoard(this.id);
            }

            const $content = $(".design__content");

            $content.on("scroll", () => {
                let contentOffsetTop = $content.offset().top;
                let offsetTop = $(this.el).offset().top;
                let contentHeight = $content.outerHeight();
                let height = $(this.el).outerHeight();

                if (offsetTop < contentOffsetTop + contentHeight / 2 && offsetTop + height > contentOffsetTop + contentHeight / 2) {
                    this.design.focusBoard = this;
                }
            });
        };

        this.setSize = (size = null) => {
            let width, height;

            size = size || this.design.data.size;

            width = 800;
            height = width * size.height / size.width;

            this.data.size = {
                width: width,
                height: height
            };

            this.bodyEl.style.width = width + 'px';
            this.bodyEl.style.height = height + 'px';
        };

        this.getIndex = () => {
            return this.zIndex++;
        };

        this.deleteBox = boxId => {
            if (this.background && this.background.id === boxId) {
                this.background.box.remove();
                removeSkeleton();
                this.background = null;
            } else {
                this.boxes = this.boxes.filter(box => {
                    if (box.id === boxId) {
                        box.box.remove();
                        removeSkeleton();
                        return false;
                    }

                    return true;
                });
            }
        };

        this.addBox = (box, cb) => {
            this.bodyEl.appendChild(box.box);
            box.board = this;
            box.attachEvent();
            box.setSize();

            if (box.data.type === "background") {
                if (this.background) {
                    this.deleteBox(this.background.id);
                }

                this.background = box;

                this.setSize({
                    width: box.img.naturalWidth,
                    height: box.img.naturalHeight
                });
            } else {
                this.boxes.push(box);
            }

            if (cb) {
                cb();
            }
        };

        this.addBoxes = () => {
            if (this.data.boxes) {
                this.data.boxes.map(box => {
                    const newBox = new Box(box);

                    this.addBox(newBox);

                    if (box.zIndex > this.zIndex) {
                        this.zIndex = box.zIndex;
                    }

                    if (box.type === "background") {
                        this.background = newBox;
                    }
                });
            }

            if (this.data.background) {
                const newBox = new Box(this.data.background);

                this.addBox(newBox);

                this.background = newBox;
            }
        };

        this.exportData = () => ({
            boxes: this.boxes.map(box => box.exportData()),
            background: this.background && this.background.exportData()
        });
    };
}();

const Box = function () {
    let count = 0;

    return function (inputData = {}) {

        const defaultData = {
            type: "text",
            text: '',
            url: '',
            scale: 1,
            rotate: 0,
            top: 50,
            left: 50,
            positionUnit: '%',
            zIndex: 0,
            color: "inherit",
            fontFamily: "Arial",
            fontSize: "20px",
            fontWeight: 400,
            fontStyle: "normal",
            textAlign: "left",
            textTransform: "none",
            shape: "origin",
            fit: "contain"
        };

        this.data = Object.assign({}, defaultData, inputData);
        this.id = count++;
        this.board = null;

        const boxNode = createBoxNode(this.data);

        this.box = boxNode.box;
        this.boxWrapper = boxNode.boxWrapper;
        this.boxContent = boxNode.boxContent;
        this.img = boxNode.boxImg;

        // Methods
        this.attachEvent = () => {
            const box = this.box,
                  img = this.img;

            if (img) {
                img.src = this.data.url;
            }

            box.addEventListener("mouseenter", e => {
                if (!this.board.design.focusBox) {
                    this.updateEl({}, false);
                }
            });

            box.addEventListener("mouseleave", e => {
                if (!this.board.design.focusBox) {
                    removeSkeleton();
                }
            });

            box.addEventListener("mousedown", e => e.stopPropagation());

            box.addEventListener("click", e => {
                e.stopPropagation();

                this.board.design.focusBoard = this.board;
                this.board.design.focusBox = this;

                if (this.data.type !== "background") {
                    this.dragEl();
                    this.rotateEl();
                    this.resizeEl();
                    this.updateEl();
                } else {
                    this.updateEl({}, false);
                }

                onFocusBox(this.data);
            });

            this.updateEl();
        };

        this.float = () => {
            if (!this.board) {
                return;
            }

            zIndex = this.board.getIndex();

            this.updateEl({ zIndex });
        };

        this.setSize = () => {
            if (this.data.type !== 'image') return;

            const boardSize = this.board.data.size;
            const originWidth = this.img.naturalWidth;
            const originHeight = this.img.naturalHeight;

            let width, height;

            width = boardSize.width < originWidth ? boardSize.width : originWidth;
            height = width * originHeight / originWidth;

            if (height > boardSize.height) {
                height = boardSize.height;
                width = height * originWidth / originHeight;
            }

            this.boxContent.style.width = width + 'px';
            this.boxContent.style.height = height + 'px';
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

                this.updateEl({
                    top: this.box.offsetTop - pos2,
                    left: this.box.offsetLeft - pos1,
                    positionUnit: 'px'
                });
            };

            const closeDragElement = () => {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            };

            this.box.onmousedown = dragMouseDown;
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

                var { x, y, width, height } = this.boxWrapper.getBoundingClientRect();
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

                this.updateEl({ rotate: angle });
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

                return result + "deg";
            };

            var box = this.box;
            var rotateBtn = document.querySelector(".skeleton__rotate");
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
                let originWidth = this.boxWrapper.clientWidth;
                let originHeight = this.boxWrapper.clientHeight;
                let { x, y, width, height } = this.boxWrapper.getBoundingClientRect();

                let centerX = x + width / 2;
                let centerY = y + height / 2;

                let scaleX = Math.abs(mouseX - centerX) * 2 / originWidth;
                let scaleY = Math.abs(mouseY - centerY) * 2 / originHeight;

                scale = scaleX < scaleY ? scaleY : scaleX;

                this.updateEl({ scale });
            };

            const closeDragElement = () => {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            };

            let resizeBtns = document.querySelectorAll(".skeleton__resize");

            Array.from(resizeBtns, function (btn) {
                btn.onmousedown = dragMouseDown;
            });
        };

        this.updateEl = (newData = {}, showSkeletonBtn = true) => {
            const { box, boxWrapper, boxContent, boxImg } = this;
            this.data = Object.assign({}, this.data, newData);
            const {
                type,
                text,
                top,
                left,
                positionUnit,
                rotate,
                scale,
                zIndex,
                color,
                fontFamily,
                fontSize,
                fontWeight,
                fontStyle,
                fit,
                shape
            } = this.data;

            if (newData.url && this.img) {
                this.img.setAttribute('src', newData.url);
            }

            box.style.top = top + positionUnit;
            box.style.left = left + positionUnit;
            box.style.zIndex = zIndex;
            box.style.transform = `scale(${scale}) rotate(${rotate})`;

            switch (fontStyle) {
                case 'bold':
                    box.style.fontWeight = 700;
                    box.style.fontStyle = 'normal';
                    break;
                case 'italic':
                    box.style.fontWeight = 400;
                    box.style.fontStyle = 'italic';
                    break;
                case 'bolditalic':
                    box.style.fontWeight = 700;
                    box.style.fontStyle = 'italic';
                    break;
                default:
                    box.style.fontWeight = 400;
                    box.style.fontStyle = 'normal';
            }

            switch (type) {
                case "text":
                    box.style.color = color;
                    box.style.fontFamily = fontFamily;
                    box.style.fontSize = fontSize;
                    // box.style.fontWeight = fontWeight;
                    // box.style.fontStyle = fontStyle;

                    this.boxContent.innerText = text;
                    break;
                case "background":
                    box.style.background = color;
                    box.style.width = '100%';
                    box.style.height = '100%';
                    box.style.top = 0;
                    box.style.left = 0;
                    boxWrapper.style.width = '100%';
                    boxWrapper.style.height = '100%';
                    break;
                case "image":
                    boxContent.classList.remove('circle', 'square', 'origin', 'fit', 'cover', 'contain');
                    boxContent.classList.add(shape, fit);
                    break;
                default:
                    break;
            }

            this.updateSkeleton(showSkeletonBtn && this.data.type !== "background");
        };

        this.getData = () => this.data;

        this.delete = () => {
            this.board.design.focusBox = null;
            this.board.deleteBox(this.id);
        };

        this.updateSkeleton = (hasBtns = false) => {
            const { box, boxWrapper } = this;
            const { rotate, scale } = this.data;
            const { width, height } = box.getBoundingClientRect();
            const coords = getCoords(box);

            updateSkeleton({
                top: coords.top + height / 2,
                left: coords.left + width / 2,
                width: Math.abs(boxWrapper.clientWidth * scale),
                height: Math.abs(boxWrapper.clientHeight * scale),
                rotate
            }, hasBtns);
        };

        this.exportData = () => Object.assign({}, this.data);
    };
}();

let design, colorPicker, bgPicker;

$(function () {
    $(".sticky__toggle").on("click", function () {
        $(".sticky").toggleClass("active");
        // $(".sticky__list").slideToggle(300);
    });
});

$(function () {
    $(".js-search-toggle").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".js-search").slideToggle();
    });

    $(".js-search").on("click", function (e) {
        e.stopPropagation();
    });

    $("html, body").on("click", function (e) {
        $(".js-search").slideUp();
    });
});

$(function () {
    $(".js-payment-type").on("change", function () {
        var isChecked = $(".js-bank-select").prop("checked");

        if (isChecked) {
            $(".bank-select").slideDown();
        } else {
            $(".bank-select").slideUp();
        }
    });
});

$(function () {
    $(".js-download-link").on("click", function (e) {
        e.preventDefault();
        var title = $(this).data("title");
        var id = $(this).data("id");

        $(".js-download-title").html(title);
        $(".js-download-id").val(id);
        $(".md-download").modal("show");
    });
});

$(function () {
    $(window).on("scroll", function () {
        removeSkeleton();
    });
});

$(function () {
    const $design = $(".design");

    if (!$design.length) {
        return;
    }

    var data = $design.data("design");

    if (typeof data === "string") {
        data = JSON.parse(data);
    }

    design = new Design(data);
    removeSkeleton();

    $(".design__btn").on("click", function () {
        design.addBoard(new Board());
    });

    $(".js-box-float").on("click", function (e) {
        e.stopPropagation();

        if (design.focusBox) {
            design.focusBox.float();
        }
    });

    $(".js-box-delete").on("click", function (e) {
        e.stopPropagation();

        if (design.focusBox) {
            design.focusBox.delete();
        }
    });

    $(".js-add-item").on("click", function (e) {
        e.stopPropagation();

        const $el = $(this);
        const type = $el.data('type') || "";
        const url = $el.data('url') || "";

        addItem({ type, url });
    });

    $(".js-add-template").on("click", function (e) {
        e.preventDefault();
        var data = $(this).data("design");
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        design = new Design(data);
        removeSkeleton();
    });

    $(document).on("keydown", e => {
        if (e.keyCode === 46 && design.focusBox) {
            design.focusBox.delete();
        }
    });

    $(".design__content").on("click", onReleaseFocusBox);

    bgPicker = Pickr.create({
        el: ".bg-picker",
        theme: "monolith", // or 'monolith', or 'nano'

        swatches: ["#FF5757", "#FF66C4", "#CB6CE6", "#8C52FF", "#5271FF", "#38B6FF", "#5CE1E6", "#7ED957", "#C9E265", "#FFDE59", "#FF914D"],

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

    bgPicker.on("change", function (color, instance) {
        const hexaColor = color.toHEXA().toString();
        const bg = new Box({
            type: "background",
            color: hexaColor
        });

        if (design.focusBoard) {
            design.focusBoard.addBox(bg);
        }
    });

    colorPicker = Pickr.create({
        el: ".color-picker",
        theme: "monolith", // or 'monolith', or 'nano'

        swatches: ["#FF5757", "#FF66C4", "#CB6CE6", "#8C52FF", "#5271FF", "#38B6FF", "#5CE1E6", "#7ED957", "#C9E265", "#FFDE59", "#FF914D"],

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

    colorPicker.on("click", function (e) {
        e.stopPropagation();
    });

    colorPicker.on("change", function (color, instance) {
        let hexaColor = color.toHEXA().toString();

        if (design.focusBox && design.focusBox.getData().type === "text") {
            design.focusBox.updateEl({
                color: hexaColor
            });
        }
    });

    $(".js-upload-image-input").on("change", function () {
        let input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                let designItem = document.createElement("div");
                let img = document.createElement("img");
                let data = {
                    type: "image",
                    url: e.target.result
                };

                img.src = e.target.result;
                designItem.classList.add("design-item");
                designItem.classList.add("js-add-item");
                designItem.append(img);

                $(".js-upload-images").append(designItem);

                designItem.addEventListener("click", function (e) {
                    addItem(data);
                });
            };

            reader.readAsDataURL(input.files[0]);
        }
    });

    $(".js-upload-bg-input").on("change", function () {
        let input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                let designItem = document.createElement("div");
                let img = document.createElement("img");
                let data = {
                    type: "background",
                    url: e.target.result
                };

                img.src = e.target.result;
                designItem.classList.add("design-item");
                designItem.classList.add("js-add-item");
                designItem.append(img);

                $(".js-upload-bgs").append(designItem);

                designItem.addEventListener("click", function (e) {
                    addItem(data);
                });
            };

            reader.readAsDataURL(input.files[0]);
        }
    });

    $(".js-text-btn").on("click", function (e) {
        e.stopPropagation();

        let text = $(".js-text-input").val();

        if (design.focusBox && design.focusBox.data.type === "text") {
            design.focusBox.data.text = text;
            design.focusBox.updateEl();
        } else {
            addItem({
                type: "text",
                text: text
            });
        }
    });

    $(".design__content").on("scroll", function () {
        if (design.focusBox) {
            const box = design.focusBox;
            if (box.data.type === "background") {
                design.focusBox.updateEl({}, false);
            } else {
                design.focusBox.updateEl();
            }
        }
    });

    $(".js-font-style, .js-font-size, .js-font-family").on("click", function (e) {
        e.stopPropagation();
    });

    $('.js-image-shape').on('change', function () {
        let val = $(this).val();

        if (design && design.focusBox) {
            design.focusBox.updateEl({ shape: val });
        }
    });

    $('.js-image-fit').on('change', function () {
        let val = $(this).val();

        if (design && design.focusBox) {
            design.focusBox.updateEl({ fit: val });
        }
    });

    $(".js-font-size").on("change", function () {
        let val = $(this).val();

        if (design.focusBox && design.focusBox.getData().type === "text") {
            design.focusBox.updateEl({
                fontSize: val
            });
        }
    });

    $(".js-font-family").on("change", function () {
        let val = $(this).val();

        if (design.focusBox && design.focusBox.getData().type === "text") {
            design.focusBox.updateEl({
                fontFamily: val
            });
        }
    });

    $(".js-font-style").on("change", function () {
        if (design.focusBox && design.focusBox.getData().type === "text") {
            let val = $(this).val();

            design.focusBox.updateEl({ fontStyle: val });
        }
    });

    $(".js-design-download").on("click", function (e) {
        e.stopPropagation();

        convert2Image(download);
    });

    $(".js-design-addcart").on("click", function (e) {
        e.stopPropagation();

        if (window.addCart) {
            convert2Image(window.addCart);
        }
    });

    $('.js-design-save').on('click', function () {
        saveDesign();
    });
});

$(function () {
    $(window).on("scroll", function () {
        removeSkeleton();
    });
});

// Sizing
$(function () {
    numberInput('.js-size-width');
    numberInput('.js-size-height');

    $(".js-change-size").on("click", function (e) {
        e.preventDefault();

        return design && design.setSize({
            width: $(this).data("width"),
            height: $(this).data("height")
        });
    });

    $('.js-change-size-btn').on('click', function (e) {
        e.preventDefault();

        return design && design.setSize({
            width: $('.js-size-width').val(),
            height: $('.js-size-height').val()
        });
    });
});

$(function () {
    const temps = JSON.parse(localStorage.designs);
    const keys = Object.keys(temps);

    keys.map(function (key) {
        $('.js-design-temps').append(`
            <div class="design-item" onclick="addTemp(${key})"><img src="${temps[key].images[0]}" alt=""></div>
        `);
    });
});