'use strict';
(function () {
  var Selector = {
    FOOTER: {
      DROPDOWN: {
        NAV: '.page-footer__nav',
        CONTACTS: '.page-footer__contacts'
      },
      DROPDOWN_TITLE: '.page-footer__title'
    }
  };

  var ClassName = {
    CLOSE_FOOTER_DROPDOWN: 'page-footer__dropdown-close'
  };
  /**
   * добавляет класс HTML-элементам
   * @param {object} selectors объект с селекторами элементов
   * @param {string} className имя класса
   *
   */
  function addСlasses(selectors, className) {
    for (var selector in selectors) {
      document.querySelector(selectors[selector])
        .classList.add(className);
    }
  };
  /**
   * добавляет переключение выпадающих списков  подвале
   *
   */
  function addFooterDropdownToggle() {
    var dropdownTitles = document.querySelectorAll(Selector.FOOTER.DROPDOWN_TITLE);
    dropdownTitles.forEach(function(dropdownTitle) {
      dropdownTitle.addEventListener('click', function() {
        dropdownTitle.parentNode.classList.toggle(ClassName.CLOSE_FOOTER_DROPDOWN);
      });
    });
  };
  addСlasses(Selector.FOOTER.DROPDOWN, ClassName.CLOSE_FOOTER_DROPDOWN); // добавляет класс, скрывающий списки в подвале
  addFooterDropdownToggle(); // добавляет переключение выпадающих списков  подвале
})();
