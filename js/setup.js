'use strict';

(function () {
  var fireballColorList = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setup = document.querySelector('.setup');
  var setupClose = document.querySelector('.setup-close');
  var userName = document.querySelector('[name="username"]');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var fireballWrap = document.querySelector('.setup-fireball-wrap');
  var fireballInput = fireballWrap.querySelector('[name="fireball-color"]');

  //  функция перебора элементов массива по порядку начиная с startNum по кругу
  var startNum = 1;
  var returnsOrder = function (arr) {
    var orderItem = arr[startNum];
    if (startNum < arr.length) {
      startNum++;
      return orderItem;
    } else {
      startNum = 1;
      return arr[0];
    }
  };

  var onSetupPressEsc = function (evt) {
    if (window.utils.isEscKeycode(evt)) {
      setup.classList.add('hidden');
      document.removeEventListener('keydown', onSetupPressEsc);
    }
  };

  var openSetup = function () {
    setup.style.top = '';
    setup.style.left = '';
    setup.classList.remove('hidden');

    setupClose.addEventListener('click', function () {
      setup.classList.add('hidden');
    });
    setupClose.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterKeycode(evt)) {
        setup.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', onSetupPressEsc);
    userName.addEventListener('focus', function () {
      document.removeEventListener('keydown', onSetupPressEsc);
    });
    userName.addEventListener('blur', function () {
      document.addEventListener('keydown', onSetupPressEsc);
    });

    wizardCoat.addEventListener('click', function () {
      wizardCoat.style.fill = returnsOrder(window.createWizards.coatColorList);
    });

    wizardEyes.addEventListener('click', function () {
      wizardEyes.style.fill = returnsOrder(window.createWizards.eyesColorList);
    });

    fireballWrap.addEventListener('click', function () {
      var colorFireball = returnsOrder(fireballColorList);
      fireballWrap.style.backgroundColor = colorFireball;
      fireballInput.value = colorFireball;
    });
  };

  window.setup = {
    element: setup,
    openSetup: openSetup
  };

})();
