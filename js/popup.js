'use strict';

(function () {
  var popup = function (popupFunction, itemActive) {
    itemActive.addEventListener('click', function () {
      popupFunction();
    });
    itemActive.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterKeycode(evt)) {
        popupFunction();
      }
    });
  };


  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setup = window.setup.openSetup;
  popup(setup, setupOpenIcon);
})();
