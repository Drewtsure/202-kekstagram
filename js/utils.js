'use strict';

(function () {
  var KeyCodes = {
    ESC: 27
  };

  window.utils = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    shuffleArray: function (array) {
      var temp;
      for (var i = 0; i < array.length; i++) {
        var j = Math.floor(window.utils.getRandomValue(i, array.length));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    isKeyEsc: function (evt) {
      return evt.keyCode === KeyCodes.ESC;
    }
  };
})();
