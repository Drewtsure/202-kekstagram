'use strict';

(function () {
  var DOWNLOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  window.download = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ответ сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ответ сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };
})();
