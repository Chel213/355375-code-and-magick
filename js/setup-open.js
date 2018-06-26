'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');

  setupOpen.addEventListener('click', function () {
    window.renderSetup.openSetup();
  });
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterKeycode(evt)) {
      window.renderSetup.openSetup();
    }
  });
})();
