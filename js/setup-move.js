'use strict';

(function () {
  var controlSetup = document.querySelector('.upload');
  controlSetup.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.renderSetup.setup.style.top = (window.renderSetup.offsetTop - shift.y) + 'px';
      window.renderSetup.setup.style.left = (window.renderSetup.setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          controlSetup.removeEventListener('click', onClickPreventDefault);
        };
        controlSetup.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
