'use strict';

(function () {
  var DOWNLOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var XHR_TIMEOUT = 5000;
  var XhrStatus = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  };

  var createAjaxRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('error', function () {
      if (xhr.status === XhrStatus.UNSENT) {
        onError('Отсутствует интернет-соединение');
        return;
      }
      onError('Произошла ошибка соединения. Код ошибки ' + xhr.status);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.HttpCode.OK:
          onLoad(xhr.response);
          break;
        case window.HttpCode.BAD_REQUEST:
          onError('Что-то не так: 400 Bad Request');
          break;
        case window.HttpCode.NOT_FOUND:
          onError('Что-то не так: 404 Not Found');
          break;
        case window.HttpCode.INTERNAL_SERVER_ERROR:
          onError('Что-то не так: 500 Server Error');
          break;
        case window.HttpCode.SERVICE_UNAVAILABLE:
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
