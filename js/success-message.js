'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var pageContent = document.querySelector('body');

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
      };

      successButtons[0].addEventListener('click', onSuccessButtonClick);
    }
  };
})();
