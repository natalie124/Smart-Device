'use strict';
(function () {
  var Selector = {
    FOOTER: {
      DROPDOWN: {
        NAV: '.page-footer__nav'
      },
      DROPDOWN_TITLE: '.page-footer__title'
    },
    MAIN: {
      CONTENT: '.page_content',
      CROP_TEXT: '.about-company__text-container p:last-child'
    }
  };

  var ClassName = {
    CLOSE_FOOTER_DROPDOWN: 'page-footer__dropdown-close'
  };

  var CROP_TEXT_SYMBOL = 200;
  /**
   * добавляет класс HTML-элементам
   * @param {object} selectors объект с селекторами элементов
   * @param {string} className имя класса
   *
   */
  function addСlasses(selectors, className) {
    for (var selector in selectors) {
      if (selectors.hasOwnProperty(selector)) {
        document.querySelector(selectors[selector])
            .classList.add(className);
      }
    }
  }
  /**
   * добавляет переключение выпадающих списков  подвале
   *
   */
  function addFooterDropdownToggle() {
    var dropdownTitles = document.querySelectorAll(Selector.FOOTER.DROPDOWN_TITLE);
    dropdownTitles.forEach(function (dropdownTitle) {
      dropdownTitle.addEventListener('click', function () {
        dropdownTitle.parentNode.classList.toggle(ClassName.CLOSE_FOOTER_DROPDOWN);
      });
    });
  }
  /**
   * обрезает текст до определенного числа символов и добавляет '..' в конце
   * @param {string} selector css селектор элемента, который обрезаем
   * @param {number} number число символов, которое оставляем
   *
   */
  function truncatesText(selector, number) {
    if (screen.width < 1024) {
      var textBox = document.querySelector(selector);
      var text = textBox.textContent.split('');
      var crupText = text.reverse().splice(-number).reverse().join('') + '..';
      textBox.textContent = crupText;
    }
  }

  addСlasses(Selector.FOOTER.DROPDOWN, ClassName.CLOSE_FOOTER_DROPDOWN); // добавляет класс, скрывающий списки в подвале
  addFooterDropdownToggle(); // добавляет переключение выпадающих списков  подвале
  truncatesText(Selector.MAIN.CROP_TEXT, CROP_TEXT_SYMBOL); // обрезает текст до 200 символов
})();
