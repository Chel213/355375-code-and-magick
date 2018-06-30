'use strict';

(function () {

  var renderError = function (message) {
    var msg = document.createElement('div');
    msg.textContent = message;
    msg.style.position = 'absolute';
    msg.style.top = '77%';
    msg.style.left = '33%';
    msg.style.width = 275 + 'px';
    msg.style.padding = 12 + 'px';
    msg.style.textAlign = 'center';
    msg.style.backgroundColor = 'white';
    msg.style.border = 2 + 'px' + ' solid' + ' red';
    document.querySelector('.setup').appendChild(msg);
  };

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время отклика');
    });

    xhr.timeout = 5000;
    xhr.open('GET', URL);
    xhr.send();
  };


  var save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка ' + xhr.status);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время отклика');
    });

    xhr.timeout = 5000;
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
    renderError: renderError
  };
})();


