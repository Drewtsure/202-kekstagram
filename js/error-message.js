'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var pageContent = document.querySelector('body');

  window.errorMessage = {
    show: function (errorData) {
      window.form.resetUploadForm();

      var error = errorTemplate.cloneNode(true);
      error.querySelector('.error__title').textContent = errorData;
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
    }
  };
})();
