$(document).ready(function () {
    Fancybox.bind('[data-fancybox]');

    $('input[type=tel]').inputmask({
        mask: '+7 (*{1}99) 999-99-99',
        placeholder: "+7 (___) ___-__-__",
        definitions: {
            '*': {
                validator: "[0-6,9]"
            }
        }
    });

    let scrollTop = 0;
    window.addEventListener('scroll', function () {
        if (!$('body').hasClass('noscroll')) {
            scrollTop = window.scrollY;
        }
    });

    $('.header__burger-btn').on('click', function () {
        const burger = $('.burger');
        const body = $('body');
        
        $('.header__burger-btn').toggleClass('active');
        burger.toggleClass('burger-opened');

        if (burger.hasClass('burger-opened')) {
            body.addClass('noscroll');
            body.css('top', `-${scrollTop}px`);
        } else {
            body.removeClass('noscroll');
            window.scroll(0, scrollTop);
        }
    });

    $(document).on('scroll', function() {
        if ($(window).scrollTop() >= 800) {
            $('.up').removeClass('up-invisible');
        } else {
            $('.up').addClass('up-invisible');
        }
    });

    $('.up').on('click', () => {
        const body = $("html, body");
        body.animate({
            scrollTop: 0
        }, 500, 'swing');
    });

    if ($('.index-slider').length) {
        const indexSlider = new Swiper('.index-slider__slider .swiper', {
            speed: 1000,
            effect: 'fade',
            allowTouchMove: false,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                prevEl: '.index-slider__slider .slider-arrow-prev',
                nextEl: '.index-slider__slider .slider-arrow-next'
            },
            pagination: {
                el: '.index-slider__slider .slider-progressbar-item',
                type: 'progressbar'
            },
            on: {
                init: function () {
                    $('.index-slider__slider .slider-progressbar-cur').text(this.activeIndex+1 < 10 ? `0${this.activeIndex+1}` : this.activeIndex+1);
                    $('.index-slider__slider .slider-progressbar-all').text(this.slides.length < 10 ? `0${this.slides.length}`: this.slides.length);
                }
            }
        });
        indexSlider.on('slideChange', function () {
            $('.index-slider__slider .slider-progressbar-cur').text(this.activeIndex+1 < 10 ? `0${this.activeIndex+1}` : this.activeIndex+1);
            $('.index-slider__slider .slider-progressbar-all').text(this.slides.length < 10 ? `0${this.slides.length}`: this.slides.length);
        });
    }

    if ($('.blog-list').length) {
        const blogListSlider = new Swiper('.blog-list__slider .swiper', {
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 25,
            navigation: {
                prevEl: '.blog-list__slider .slider-arrow-prev',
                nextEl: '.blog-list__slider .slider-arrow-next'
            },
            pagination: {
                el: '.blog-list__slider .slider-progressbar-item',
                type: 'progressbar'
            },
            breakpoints: {
                993: {
                    slidesPerView: 3
                }
            }
        });

        function blogListSliderSwitch() {
            if ($(window).width() < 993) {
                blogListSlider.disable();
            } else {
                blogListSlider.enable();
            }
        }

        if (!$('.blog-list').hasClass('blog-list_allways-slider')) {
            blogListSliderSwitch();
            $(window).on('resize', blogListSliderSwitch);
        }
    }
});