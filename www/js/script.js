"use strict";

$(document).ready(function () {
  //Бургер
  var isMobile = window.matchMedia("(max-width: 1200px)").matches;
  var burger = document.querySelector('#burger');

  if (burger) {
    var toggleBurger = function toggleBurger(event) {
      event.preventDefault();
      $(menuBlock).slideToggle(300);
      burger.classList.toggle('burger--open'); // Для моб. запрещаем прокрутку основного контента

      if (window.matchMedia("(max-width: 670px)").matches) {
        document.querySelector('.body').classList.toggle('body--on-popup');
      }
    };

    var closeBurger = function closeBurger(event) {
      if (!event.target.closest('.menu') && !event.target.closest('#burger')) {
        $(menuBlock).slideUp(300);
        burger.classList.remove('burger--open'); // если моб., то снимаем запрет прокрутки осногоо контента

        if (window.matchMedia("(max-width: 670px)").matches) {
          document.querySelector('.body').classList.remove('body--on-popup');
        }
      }
    };

    burger.addEventListener('click', toggleBurger);
    var menuBlock = document.querySelector('.menu');

    if (isMobile) {
      document.addEventListener('click', closeBurger);
    }
  } // Подменю на моб. версии


  var btnOpenSubmenuArr = document.querySelectorAll('.menu__link-more');

  if (btnOpenSubmenuArr.length !== 0) {
    for (var i = 0; i < btnOpenSubmenuArr.length; i++) {
      var openSubMenu = function openSubMenu(event) {
        event.preventDefault();
        $(this.closest('.menu__item').querySelector('.submenu')).slideToggle(300);
        this.classList.toggle('menu__link-more--open');
      };

      btnOpenSubmenuArr[i].addEventListener('click', openSubMenu);
    }
  }
  /*Полифилы для ie*/


  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
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
});
$(document).ready(function () {
  //Form
  var formInPage = document.querySelectorAll('form');

  if (formInPage.length !== 0) {
    for (var formItem = 0; formItem < formInPage.length; formItem++) {
      formInPage[formItem].addEventListener('submit', validateForm);
    }
  }

  function validateForm(event) {
    var form = event.target;
    var error = validateFields(form); //запускаем проверку полей в этой форме

    if (error === true) {
      /*если есть ошибка*/
      event.preventDefault();

      if (!form.querySelector('.form__message')) {
        form.insertAdjacentHTML('beforeend', '<div class="form__message form__message--error">Ошибки заполнения. Пожалуйста, проверьте все поля и отправьте снова.</div>');
      }
    } else {
      /*если нет ошибки - отправляем форму*/
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
      if (requredItems[item].classList.contains('form-phone')) {
        validateEmail(requredItems[item]);
      } //для телефона


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

    if (eventTarget.classList.contains('form-phone')) {
      validateEmail(eventTarget);
    } //для email-а


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
    setTimeout(function () {
      if (form.querySelector('.form__message')) {
        form.querySelector('.form__message').parentNode.removeChild(form.querySelector('.form__message'));
      }
    }, 5000);
  }

  function sendAjaxForm(dataForm) {
    $.ajax({
      url: dataForm.action,
      //url страницы jquery-mailer.php
      type: "POST",
      //метод отправки
      data: $(dataForm).serialize(),
      // Сеарилизуем объект
      success: function success(response) {
        //Данные отправлены успешно
        console.log('ok');
      },
      error: function error(response) {
        // Данные не отправлены          
        console.log('error');
      }
    });
  }

  ; // Ставим ограничения на ввод телефона

  var inputEmails = document.querySelectorAll('.form-phone');

  if (inputEmails.length !== 0) {
    var replacePhoneNum = function replacePhoneNum(event) {
      var regexpPhone = new RegExp(/[^\d\-\+\(\)\ ]/);
      event.target.value = event.target.value.replace(regexpPhone, '');
    };

    for (var i = 0; i < inputEmails.length; i++) {
      inputEmails[i].addEventListener('input', replacePhoneNum);
    }
  }
});