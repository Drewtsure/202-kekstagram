'use strict';

(function () {
  var KeyCodes = {
    ESC: 27
  };

  window.utils = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    isKeyEsc: function (evt) {
      return evt.keyCode === KeyCodes.ESC;
    }
  };
})();
