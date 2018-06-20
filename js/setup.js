'use strict';
var KEY_CODE_ESC = 27;
var KEY_CODE_ENTER = 13;

var namesList = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var familyList = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorList = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorList = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColorList = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
var userName = document.querySelector('[name="username"]');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var fireballWrap = document.querySelector('.setup-fireball-wrap');
var fireballInput = fireballWrap.querySelector('[name="fireball-color"]');

var onSetupPressEsc = function (evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onSetupPressEsc);
  }
};

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
var openSetup = function () {
  setup.style.top = '';
  setup.style.left = '';
  setup.classList.remove('hidden');

  setupClose.addEventListener('click', function () {
    setup.classList.add('hidden');
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ENTER) {
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
    wizardCoat.style.fill = returnsOrder(coatColorList);
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = returnsOrder(eyesColorList);
  });

  fireballWrap.addEventListener('click', function () {
    var colorFireball = returnsOrder(fireballColorList);
    fireballWrap.style.backgroundColor = colorFireball;
    fireballInput.value = colorFireball;
  });
};

setupOpen.addEventListener('click', function () {
  openSetup();
});
setupOpenIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    openSetup();
  }
});


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

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
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


