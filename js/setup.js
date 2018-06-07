'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

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
