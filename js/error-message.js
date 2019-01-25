'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var pageContent = document.querySelector('main');

  window.errorMessage = {
    show: function (errorData) {
      window.form.resetUploadForm();

      var error = errorTemplate.cloneNode(true);
      error.querySelector('.error__title').textContent = errorData;
      pageContent.appendChild(error);

      var closeButtons = error.querySelectorAll('.error__button');

      var onErrorCloseClick = function () {
        pageContent.removeChild(error);
        document.removeEventListener('keydown', onDocumentKeyPress);
        document.removeEventListener('click', onDocumentClick);
      };

      var onTryAgainButtonClick = function () {
        onErrorCloseClick();
        closeButtons[0].removeEventListener('click', onTryAgainButtonClick);
      };

      var onUploadNewFileButtonClick = function () {
        onErrorCloseClick();
        closeButtons[1].removeEventListener('click', onTryAgainButtonClick);
      };

      var onDocumentKeyPress = function (evt) {
        if (window.utils.isKeyEsc(evt)) {
          onErrorCloseClick();
        }
      };

      var onDocumentClick = function (evt) {
        if (evt.target === error) {
          onErrorCloseClick();
        }
      };

      closeButtons[0].addEventListener('click', onTryAgainButtonClick);
      closeButtons[1].addEventListener('click', onUploadNewFileButtonClick);
      document.addEventListener('keydown', onDocumentKeyPress);
      document.addEventListener('click', onDocumentClick);
    }
  };
})();
