$(document).ready(function () {

    //Бургер
    var isMobile = window.matchMedia("(max-width: 1200px)").matches;
    var burger = document.querySelector('#burger');
    if (burger) {
        burger.addEventListener('click', toggleBurger);

        var menuBlock = document.querySelector('.menu');

        function toggleBurger(event) {
            event.preventDefault();
            $(menuBlock).slideToggle(300);
            burger.classList.toggle('burger--open');

            // Для моб. запрещаем прокрутку основного контента
            if (window.matchMedia("(max-width: 670px)").matches) {
                document.querySelector('.body').classList.toggle('body--on-popup');
            }
        }

        if (isMobile) { document.addEventListener('click', closeBurger); }
        function closeBurger(event) {
            if (!(event.target.closest('.menu')) && !(event.target.closest('#burger'))) {
                $(menuBlock).slideUp(300);
                burger.classList.remove('burger--open');

                // если моб., то снимаем запрет прокрутки осногоо контента
                if (window.matchMedia("(max-width: 670px)").matches) {
                    document.querySelector('.body').classList.remove('body--on-popup');
                }
            }
        }
    }

    // Подменю на моб. версии
    var btnOpenSubmenuArr = document.querySelectorAll('.menu__link-more');
    if (btnOpenSubmenuArr.length !== 0) {
        for (var i = 0; i < btnOpenSubmenuArr.length; i++) {
            btnOpenSubmenuArr[i].addEventListener('click', openSubMenu);

            //Для случаев когда у основного пункта меню нет ссылки
            if (!(btnOpenSubmenuArr[i].closest('.menu__link').href)) {
                btnOpenSubmenuArr[i].closest('.menu__link').querySelector('.menu__link-name').addEventListener('click', imitationClickBtnOpenSumbenu);
            } 
        }
        function openSubMenu(event) {
            event.preventDefault();
            if (window.matchMedia("(max-width: 1200px)").matches) {
                $(this.closest('.menu__item').querySelector('.submenu')).slideToggle(300);
                this.classList.toggle('menu__link-more--open');
            }
        }
        function imitationClickBtnOpenSumbenu(event) {
            //создаем событие клика по кнопке
            var clickBtnOpenSubmenu;
            if (typeof (Event) === 'function') {
                clickBtnOpenSubmenu = new Event('click', { bubbles: true, cancelable: true });
            } else {
                clickBtnOpenSubmenu = document.createEvent('Event');
                clickBtnOpenSubmenu.initEvent('click', true, true);
            }
            this.parentNode.querySelector('.menu__link-more').dispatchEvent(clickBtnOpenSubmenu); //вызываем событие

            //Запись не пододит для ie!
            // var clickBtnOpenSubmenu = new Event('click', { bubbles: true, cancelable: true });
            // this.querySelector('.menu__link-more').dispatchEvent(clickBtnOpenSubmenu); 
        }
    }

    //Промо-слайдер
    var promoSlider = document.querySelector('#promo-slider');
    if (promoSlider) {

        function versionSlider() {
            return window.matchMedia("(max-width: 670px)").matches;
        }
        var isMobileForSlider = versionSlider();
        StartSliders();

        function StartSliders() {

            if (!isMobileForSlider) {
                //promo-slider
                $('#promo-slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    arrows: true,
                    rows: 0,
                    // infinite: false,
                    variableWidth: true,
                    prevArrow: '<button class="promo-slider__arrow promo-slider__arrow--left" type="button"></button>',
                    nextArrow: '<button class="promo-slider__arrow promo-slider__arrow--right" type="button"></button>',
                    speed: 1000,
                    initialSlide: 1,

                    responsive: [
                        {
                            breakpoint: 960,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            } else {
                //promo-slider-mob
                $('#promo-slider-mob').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    rows: 0,
                    prevArrow: '<button class="promo-slider__arrow promo-slider__arrow--left" type="button"></button>',
                    nextArrow: '<button class="promo-slider__arrow promo-slider__arrow--right" type="button"></button>'
                });
            }
        }

        window.addEventListener('resize', checkDevice);
        function checkDevice() {
            var newIsMobileForSlider = versionSlider();
            if (newIsMobileForSlider !== isMobileForSlider) {
                isMobileForSlider = newIsMobileForSlider;
                if ($("#promo-slider").hasClass("slick-initialized")) { $("#promo-slider").slick("unslick"); }
                if ($("#promo-slider-mob").hasClass("slick-initialized")) { $("#promo-slider-mob").slick("unslick"); }
                StartSliders();
            }
        }
    }

    //Переход по ссылке-анкору  
    $('.link-anchor').on("click", function (e) {
        e.preventDefault();
        var mylink = $(this).attr('href');
        var positionblock = $(mylink).offset().top; //вычисляем позицию блока
        if (window.matchMedia("(max-width: 1200px)").matches) {
            positionblock = positionblock - 90;
        }
        $('html, body').animate({ scrollTop: positionblock }, 700);
    });

    //Слайдер с фото-продуктов
    var productsSlider = document.querySelector('.products-slider__slider');
    if (productsSlider) {
        function currentDevice() {
            return window.matchMedia("(max-width: 960px)").matches;
        }
        var isMobile = currentDevice();

        // if (!isMobile) { startProductsSlider(); }
        startProductsSlider();
        function startProductsSlider() {
            $('.products-slider__slider').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: '<button class="products-slider__arrow products-slider__arrow--left" type="button"></button>',
                nextArrow: '<button class="products-slider__arrow products-slider__arrow--right" type="button"></button>',
                rows: 0,

                responsive: [
                    {
                        breakpoint: 2000,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 1440,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 960,
                        settings: "unslick"
                    }
                ]
            });
        }

        window.addEventListener('resize', checkDevice);
        function checkDevice() {
            var newDevice = currentDevice();

            if (newDevice !== isMobile) {
                isMobile = newDevice;
                if (isMobile) {
                    // $('.products-slider__slider').slick("unslick");
                } else {
                    startProductsSlider();
                }
            }
        }
    }

    // Слайдер отзывов
    $('#reviews-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        dots: true,
        appendDots: $('.reviews__slider-dots'),
        rows: 0,

        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Слайдер истории компании
    $('#history-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        rows: 0,
        variableWidth: true,
        prevArrow: '<button class="history-slider__arrow history-slider__arrow--left" type="button"></button>',
        nextArrow: '<button class="history-slider__arrow history-slider__arrow--right" type="button"></button>',
        dots: true,
        appendDots: $('#history-slider-nav'),
        speed: 1000,
        autoplay: true,
        pauseOnHover: false,
        autoplaySpeed: 3000,

        responsive: [
            {
                breakpoint: 670,
                settings: {
                    variableWidth: false,
                    arrows: false
                }
            }
        ]
    });

    //Аккордион мероприятий
    var eventsArr = document.querySelectorAll('.event');
    if (eventsArr.length !== 0) {
        for (var i = 0; i < eventsArr.length; i++) {
            eventsArr[i].querySelector('.event__name').addEventListener('click', toggleEventInfo);
        }
        function toggleEventInfo(event) {
            var activeEvent = document.querySelector('.event__name--open');
            if (activeEvent && (activeEvent !== this)) {
                activeEvent.classList.remove('event__name--open');
                $(activeEvent.closest('.event').querySelector('.event__info')).hide(300);
            }
            this.classList.toggle('event__name--open');
            $(this.closest('.event').querySelector('.event__info')).toggle(300);
        }
    }

    // Поиск по сайту
    var searchBtn = document.querySelector('#search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearchBlock);

        var searchBlock = document.querySelector('#search-block');
        function openSearchBlock(event) {
            searchBlock.classList.add('search-block__search--open');
            searchBtn.classList.add('search-block__btn--hide');
        }

        var btnCloseSearch = searchBlock.querySelector('#search-close');
        btnCloseSearch.addEventListener('click', () => { searchBlock.classList.remove('search-block__search--open'); searchBtn.classList.remove('search-block__btn--hide'); })
    }

    //Открытие вариантов фильтра новостей в моб. версии
    var btnOpenFiltersNews = document.querySelector('#news-filters-choise');
    if (btnOpenFiltersNews) {
        btnOpenFiltersNews.addEventListener('click', toggleFiltersNews);
        function toggleFiltersNews(event) {
            if (window.matchMedia("(max-width: 670px)").matches) {
                btnOpenFiltersNews.classList.toggle('news-archive__filter-title-mob--open');
                document.querySelector('.news-filter').classList.toggle('news-filter--open');
            }
        }

        //Смена выбранного фильтра (для моб.)
        if (window.matchMedia("(max-width: 670px)").matches) {
            var filtersNewsArr = document.querySelectorAll('.news-filter__checkbox');
            for (var i = 0; i < filtersNewsArr.length; i++) {
                filtersNewsArr[i].addEventListener('click', changeChoiseFilterNews);

                if (filtersNewsArr[i].checked) {
                    var choiseFilterNews = filtersNewsArr[i].value;
                    btnOpenFiltersNews.querySelector('.news-filter__label').innerHTML = choiseFilterNews;
                }
            }
            function changeChoiseFilterNews(event) {
                var newChoiseFilterNews = this.value;
                btnOpenFiltersNews.querySelector('.news-filter__label').innerHTML = newChoiseFilterNews;
            }
        }
    }

    // Появление Cookies
    var cookies = document.querySelector('.cookies');
    if (cookies) { workCookiesBlock(); } 
    function workCookiesBlock() {
        openCookiesBlock();
        function openCookiesBlock() {
            setTimeout(function () {
                cookies.classList.add('cookies--open');
            }, 500);

            var btnsCloseCookies = cookies.querySelectorAll('.cookies__close');
            for (var i = 0; i < btnsCloseCookies.length; i++) {
                btnsCloseCookies[i].addEventListener('click', closeCookiesBlock);
            }
        }
        function closeCookiesBlock(event) {
            event.preventDefault();
            cookies.classList.remove('cookies--open');
        }
    }

    // Выбор языка
    var choiseLangBtn = document.querySelector('#language-btn');
    if (choiseLangBtn) {
        choiseLangBtn.addEventListener('click', openChoiseLang);

        function openChoiseLang(event) {
            this.classList.toggle('language__lang--active');
            this.parentNode.querySelector('.language__choise-block').classList.toggle('language__choise-block--active');
        }

        document.addEventListener('click', closeChoiseLang);
        function closeChoiseLang(event) {
            if (!(event.target.closest('.language'))) {
                choiseLangBtn.classList.remove('language__lang--active');
                choiseLangBtn.parentNode.querySelector('.language__choise-block').classList.remove('language__choise-block--active');
            }
        }
    }
    
    // Слайдер клиентов
    $('#our-clients-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<button class="our-clients__arrow our-clients__arrow--left" type="button"></button>',
        nextArrow: '<button class="our-clients__arrow our-clients__arrow--right" type="button"></button>',
        rows: 0,

        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // Слайдер на главной
    $('#top-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        rows: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        fade: true,
        speed: 700,
        cssEase: 'linear'
    });

})

$(document).ready(function () {

    //Form
    var formInPage = document.querySelectorAll('.form');
    if (formInPage.length !== 0) {
        for (var formItem = 0; formItem < formInPage.length; formItem++) {
            formInPage[formItem].addEventListener('submit', validateForm);
        }
    }

    function validateForm(event) {
        var form = event.target;
        var error = validateFields(form); //запускаем проверку полей в этой форме

        if (error === true) { /*если есть ошибка*/
            event.preventDefault();

            if (!(form.querySelector('.form__message'))) {
                form.insertAdjacentHTML('beforeend', '<div class="form__message form__message--error">Ошибки заполнения. Пожалуйста, проверьте все поля и отправьте снова.</div>');
            }
        }
        else { /*если нет ошибки - отправляем форму*/
            event.preventDefault();
            form.insertAdjacentHTML('beforeend', '<div class="form__message form__message--ok">Ваша заявка принята. Мы свяжемся с вами в ближайшее время</div>');

            sendAjaxForm(form); //отправка формы
            resetForm(form); //очищаем форму
        }
    }
    function validateFields(form) {
        var error = false;
        var requredItems = form.querySelectorAll('[required]');

        for (var item = 0; item < requredItems.length; item++) {
            if (requredItems[item].classList.contains('form-phone')) { validateEmail(requredItems[item]); } //для телефона

            if (!requredItems[item].checkValidity()) {
                requredItems[item].classList.add('form__input--error');
                error = true;
            }
            requredItems[item].addEventListener('input', changeFields); //подписываем на событие input на поле
            requredItems[item].addEventListener('change', changeFields); //для checkbox/radio
        }
        return error;
    }
    function validateEmail(email) {
        var emailNumbers = email.value;
        var regexpNumbers = new RegExp(/[^\d]/g);
        var emailNumbers = emailNumbers.replace(regexpNumbers, '');
        if (emailNumbers.length < 11) {
            email.setCustomValidity('error'); //пользовательская ошибка!
        } else {
            email.setCustomValidity('');
        }
    }

    function changeFields(event) {
        var eventTarget = event.target;

        if (eventTarget.classList.contains('form-phone')) { validateEmail(eventTarget); } //для email-а

        if (eventTarget.checkValidity()) {
            eventTarget.classList.remove("form__input--error");

            if (eventTarget.closest('form').querySelector('.form__message')) {
                var error = validateFields(eventTarget.closest('form'));
                if (error === false) {
                    var messageForm = eventTarget.closest('form').querySelector('.form__message');
                    messageForm.parentNode.removeChild(messageForm);
                }
            }

        }
    }

    function resetForm(form) {
        $(form).trigger('reset');
        setTimeout(() => {
            if (form.querySelector('.form__message')) {
                form.querySelector('.form__message').parentNode.removeChild(form.querySelector('.form__message'));
            }
        }, 5000);
    }

    function sendAjaxForm(dataForm) {
        $.ajax({
            url: dataForm.action, //url страницы jquery-mailer.php
            type: "POST", //метод отправки
            data: $(dataForm).serialize(),  // Сеарилизуем объект
            success: function (response) { //Данные отправлены успешно
                console.log('ok');
            },
            error: function (response) { // Данные не отправлены          
                console.log('error');
            }
        });
    };

    // Ставим ограничения на ввод телефона
    var inputEmails = document.querySelectorAll('.form-phone');
    if (inputEmails.length !== 0) {
        for (var i = 0; i < inputEmails.length; i++) {
            inputEmails[i].addEventListener('input', replacePhoneNum);
        }
        function replacePhoneNum(event) {
            var regexpPhone = new RegExp(/[^\d\-\+\(\)\ ]/);
            event.target.value = event.target.value.replace(regexpPhone, '');
        }
    }

})

/*Полифилы для ie*/
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}