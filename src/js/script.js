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
        }

        document.addEventListener('click', closeBurger);
        function closeBurger(event) {
            if (!(event.target.closest('.menu')) && !(event.target.closest('#burger'))) {
                $(menuBlock).slideUp(300);
                burger.classList.remove('burger--open');
            }
        }
    }

    // Подменю на моб. версии
    var btnOpenSubmenuArr = document.querySelectorAll('.menu__link-more');
    if(btnOpenSubmenuArr.length !== 0) {
        for(var i=0; i< btnOpenSubmenuArr.length; i++) {
            btnOpenSubmenuArr[i].addEventListener('click', openSubMenu);
            function openSubMenu(event) {
                event.preventDefault();
                $(this.closest('.menu__item').querySelector('.submenu')).slideToggle(300);
                this.classList.toggle('menu__link-more--open')
            }
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