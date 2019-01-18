'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var pageContent = document.querySelector('body');

  window.utils = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    showUploadError: function (data) {
      window.form.resetUploadForm();

      var error = errorTemplate.cloneNode(true);
      error.querySelector('.error__title').textContent = data;
      pageContent.appendChild(error);

      var closeButtons = error.querySelectorAll('.error__button');

      var onTryAgainButtonClick = function () {
        pageContent.removeChild(error);
        closeButtons[0].removeEventListener('click', onTryAgainButtonClick);
      };

      var onUploadNewFileButtonClick = function () {
        pageContent.removeChild(error);
        closeButtons[1].removeEventListener('click', onTryAgainButtonClick);
      };

      closeButtons[0].addEventListener('click', onTryAgainButtonClick);
      closeButtons[1].addEventListener('click', onUploadNewFileButtonClick);
    },

    showDownloadError: function (data) {
      throw new Error(data);
    },

    showSuccess: function (data) {
      var success = successTemplate.cloneNode(true);
      var successButtons = success.querySelectorAll('button');

      var responseFromServer = document.createElement('p');
      responseFromServer.textContent = 'Загружен файл: ' + data.filename.filename;
      success.querySelector('.success__inner').insertBefore(responseFromServer, successButtons[0]);
      pageContent.appendChild(success);

      var onSuccessButtonClick = function () {
        pageContent.removeChild(success);
        successButtons[0].removeEventListener('click', onSuccessButtonClick);
      };

      successButtons[0].addEventListener('click', onSuccessButtonClick);
    }
  };
})();
