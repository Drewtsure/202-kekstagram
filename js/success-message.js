'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var pageContent = document.querySelector('main');

  window.successMessage = {
    show: function (successData) {
      var success = successTemplate.cloneNode(true);
      var successButtons = success.querySelectorAll('button');

      var responseFromServer = document.createElement('p');
      responseFromServer.textContent = 'Загружен файл: ' + successData.filename.filename;
      success.querySelector('.success__inner').insertBefore(responseFromServer, successButtons[0]);
      pageContent.appendChild(success);

      var onSuccessButtonClick = function () {
        pageContent.removeChild(success);
        successButtons[0].removeEventListener('click', onSuccessButtonClick);
        document.removeEventListener('keydown', onDocumentKeyPress);
        document.removeEventListener('click', onDocumentClick);
      };

      var onDocumentKeyPress = function (evt) {
        if (window.utils.isKeyEsc(evt)) {
          onSuccessButtonClick();
        }
      };

      var onDocumentClick = function (evt) {
        if (evt.target === success) {
          onSuccessButtonClick();
        }
      };

      successButtons[0].addEventListener('click', onSuccessButtonClick);
      document.addEventListener('keydown', onDocumentKeyPress);
      document.addEventListener('click', onDocumentClick);
    }
  };
})();
