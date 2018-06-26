'use strict';

(function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESC = 27;

  window.utils = {
    isEnterKeycode: function (evt) {
      return evt.keyCode === KEY_CODE_ENTER;
    },

    isEscKeycode: function (evt) {
      return evt.keyCode === KEY_CODE_ESC;
    }
  };
})();
