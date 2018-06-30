'use strict';

(function () {

  var amountWizards = 4;

  var similarItem = document.querySelector('.setup-similar');
  var similarListItem = document.querySelector('.setup-similar-list');
  var similarListTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  similarItem.classList.remove('hidden');


  window.backend.load(function (wizards) {
    for (var i = 0; i < amountWizards; i++) {
      var simularWizard = similarListTemplate.cloneNode(true);
      simularWizard.querySelector('.setup-similar-label').textContent = wizards[i].name;
      simularWizard.querySelector('.wizard-coat').style.fill = wizards[i].colorCoat;
      simularWizard.querySelector('.wizard-eyes').style.fill = wizards[i].colorEyes;
      similarListItem.appendChild(simularWizard);
    }
  },
  window.backend.renderError
  );

})();
