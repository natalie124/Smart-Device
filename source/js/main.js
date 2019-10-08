'use strict';
(function () {
  var Selector = {
    HEADER: {
      CONTACTS_BTN: '.header-contacts__btn'
    },
    FOOTER: {
      DROPDOWN: {
        NAV: '.page-footer__nav',
        CONTACTS: '.page-footer__contacts'
      },
      DROPDOWN_TITLE: '.page-footer__title'
    },
    MAIN: {
      CONTENT: '.page_content',
      CROP_TEXT: '.about-company__text-container p:last-child'
    },
    BODY: 'body',
    OVERLAY: '.overlay',
    FEEDBACK_POPUP: '.feedback__popup',
    FEEDBACK_CLOSE: '.feedback__close',
    PHONE_INPUT: [
      '#phone',
      '#popup-phone'
    ]
  };

  var ClassName = {
    CLOSE_FOOTER_DROPDOWN: 'page-footer__dropdown-close',
    OPEN_POPUP: 'feedback__popup--open',
    SCROLL_HIDDEN: 'scroll-hidden'
  };

  var Code = {
    ENTER: 13,
    ESC: 27
  };

  var CROP_TEXT_SYMBOL = 200;

  var popupOpenBtn = document.querySelector(Selector.HEADER.CONTACTS_BTN);
  var popupCloseBtn = document.querySelector(Selector.FEEDBACK_CLOSE);

  var popup = document.querySelector(Selector.FEEDBACK_POPUP);
  var overlay = document.querySelector(Selector.OVERLAY);
  var body = document.querySelector(Selector.BODY);

  /**
   * открывает окно
   *
   */
  function openPopup() {
    if (popup && overlay && ClassName.OPEN_POPUP) {
      var fieldName = popup.querySelector('input#popup-name');

      popup.classList.add(ClassName.OPEN_POPUP);
      overlay.classList.add(ClassName.OPEN_POPUP);
      body.classList.add(ClassName.SCROLL_HIDDEN);
      fieldName.focus();
      document.addEventListener('keydown', onEscPress);
    }
  }
  /**
   * закрывает окно
   *
   */
  function closePopup() {
    if (popup && overlay && ClassName.OPEN_POPUP) {
      popup.classList.remove(ClassName.OPEN_POPUP);
      overlay.classList.remove(ClassName.OPEN_POPUP);
      body.classList.remove(ClassName.SCROLL_HIDDEN);
      document.removeEventListener('keydown', onEscPress);
    }
  }
  /**
   * обрабатывает событие при нажатии  Esc
   *
   * @param {object} evt объект события
   * @param {function}  action действие, когда событие сработает
   */
  function isEscEvent(evt, action) {
    if (evt.keyCode === Code.ESC) {
      action();
    }
  }
  /**
   * обрабатывает событие при нажатии  Enter
   *
   * @param {object} evt объект события
   * @param {function}  action действие, когда событие сработает
   */
  function isEnterEvent(evt, action) {
    if (evt.keyCode === Code.ENTER) {
      action();
    }
  }
  /**
   * обрабатывает событие при нажатии Esc
   *
   * @param {object} evt объект события
   */
  function onEscPress(evt) {
    isEscEvent(evt, closePopup);
  }
  /**
   * обрабатывает событие открытия окна при нажатии Enter
   *
   * @param {object} evt объект события
   */
  function onPopupOpenBtnEnterPress(evt) {
    isEnterEvent(evt, openPopup);
  }
  /**
   * добавляет класс HTML-элементам
   * @param {object} selectors объект с селекторами элементов
   * @param {string} className имя класса
   *
   */
  function addСlasses(selectors, className) {
    for (var selector in selectors) {
      if (selectors && selectors.hasOwnProperty(selector)) {
        document.querySelector(selectors[selector])
            .classList.add(className);
      }
    }
  }

  /**
   * добавляет переключение выпадающих списков
   * @param {string} selector css селектор элементов
   * @param {string} className css класс элемента, который переключается
   *
   */
  function addFooterDropdownToggle(selector, className) {

    if (selector && className) {
      var dropdownTitles = document.querySelectorAll(selector);
      for (var i = 0; i < dropdownTitles.length; i++) {
        dropdownTitles[i].addEventListener('click', function (evt) {
          for (var j = 0; j < dropdownTitles.length; j++) {
            if (dropdownTitles[j] !== evt.target) {
              dropdownTitles[j].parentNode.classList.add(className);
            }
          }
          evt.target.parentNode.classList.toggle(className);
        });
      }
    }

  }
  /**
   * обрезает текст до определенного числа символов и добавляет '..' в конце
   * @param {string} selector css селектор элемента, который обрезаем
   * @param {number} number число символов, которое оставляем
   *
   */
  function truncatesText(selector, number) {
    if (screen.width < 1024 && selector) {
      var textBox = document.querySelector(selector);
      var text = textBox.textContent.split('');
      var crupText = text.reverse().splice(-number).reverse().join('') + '..';
      textBox.textContent = crupText;
    }
  }
  /**
   * добавляет маски полям для ввода телефонных номеров
   * @param {array} selectors массив с селекторами элементов
   *
   */
  function createPhoneMasks(selectors) {
    var maskOptions = {
      mask: '+7(000)000-00-00'
    };
    /**
    * добавляет маску полю для ввода телефонного номера
    * @param {string} selector селектор элемента
    *
    */
    function createPhoneMask(selector) {
      if (selector) {
        var element = document.querySelector(selector);

        if (element) {
          element.addEventListener('focus', function (evt) {
            var phone = evt.target;

            var maskPhone = new IMask(phone, maskOptions);

            phone.addEventListener('focusout', function () {
              if (maskPhone && phone.value === '') {
                maskPhone._listeners.length = 0;
              }
            });
          });
        }
      }
    }
    for (var i = 0; i < selectors.length; i++) {
      createPhoneMask(selectors[i]);
    }
  }

  addСlasses(Selector.FOOTER.DROPDOWN, ClassName.CLOSE_FOOTER_DROPDOWN); // добавляет класс, скрывающий списки в подвале
  addFooterDropdownToggle(Selector.FOOTER.DROPDOWN_TITLE, ClassName.CLOSE_FOOTER_DROPDOWN); // добавляет переключение выпадающих списков  подвале
  truncatesText(Selector.MAIN.CROP_TEXT, CROP_TEXT_SYMBOL); // обрезает текст до 200 символов
  createPhoneMasks(Selector.PHONE_INPUT); // добавляет маски полям с телефонными номерами

  popupOpenBtn.addEventListener('click', openPopup);
  popupOpenBtn.addEventListener('keydown', onPopupOpenBtnEnterPress);
  popupCloseBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);
})();
