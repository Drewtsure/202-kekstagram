'use strict';

(function () {
  var DOWNLOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var createAjaxRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.httpCode.OK:
          onLoad(xhr.response);
          break;
        case window.httpCode.BAD_REQUEST:
          onError('Что-то не так: 400 Bad Request');
          break;
        case window.httpCode.NOT_FOUND:
          onError('Что-то не так: 404 Not Found');
          break;
        case window.httpCode.INTERNAL_SERVER_ERROR:
          onError('Что-то не так: 500 Server Error');
          break;
        case window.httpCode.SERVICE_UNAVAILABLE:
          onError('Что-то не так: 503 Service Unavailable');
          break;
        default:
          onError('Ответ сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    return xhr;
  };

  window.backend = {
    download: function (onLoad, onError) {
      var xhr = createAjaxRequest(onLoad, onError);

      xhr.open('GET', DOWNLOAD_URL);
      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      var xhr = createAjaxRequest(onLoad, onError);

      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    }
  };
})();
