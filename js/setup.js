'use strict';

//  utils.js
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


//  createWizards.js
(function () {
  var namesList = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var familyList = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColorList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColorList = ['black', 'red', 'blue', 'yellow', 'green'];
  var amountWizards = 4;

  var selectRandomItem = function (itemsList) {
    var i = Math.floor((Math.random() * itemsList.length));
    return itemsList[i];
  };

  var createListFeatures = function () {
    var listFeature = {
      name: selectRandomItem(namesList) + ' ' + selectRandomItem(familyList),
      coatColor: selectRandomItem(coatColorList),
      eyesColor: selectRandomItem(eyesColorList)
    };
    return listFeature;
  };

  var createWizards = function (amtWizards) {
    var wizards = [];
    for (var i = 0; i < amtWizards; i++) {
      wizards[i] = createListFeatures();
    }
    return wizards;
  };

  var wizards = createWizards(amountWizards);

  var similarItem = document.querySelector('.setup-similar');
  var similarListItem = document.querySelector('.setup-similar-list');
  var similarListTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  similarItem.classList.remove('hidden');

  for (var i = 0; i < amountWizards; i++) {
    var simularWizard = similarListTemplate.cloneNode(true);
    simularWizard.querySelector('.setup-similar-label').textContent = wizards[i].name;
    simularWizard.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    simularWizard.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    similarListItem.appendChild(simularWizard);
  }

  window.createWizards = {
    coatColorList: coatColorList,
    eyesColorList: eyesColorList
  };
})();

//  render-setup.js
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

  window.renderSetup = {
    setup: setup,
    openSetup: openSetup
  };

})();


//  setup-open.js
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


// setup-move.js
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


