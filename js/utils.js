'use strict';

(function () {
  var KeyCodes = {
    ESC: 27,
    LEFT: 37,
    RIGHT: 39
  };

  window.utils = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    shuffleArray: function (shuffledArray) {
      var temp;
      shuffledArray.forEach(function (element, elementIndex, array) {
        var newIndex = Math.floor(window.utils.getRandomValue(elementIndex, array.length));
        temp = array[elementIndex];
        array[elementIndex] = array[newIndex];
        array[newIndex] = temp;
      });
      return shuffledArray;
    },
    isKeyEsc: function (evt) {
      return evt.keyCode === KeyCodes.ESC;
    },
    keyCodes: KeyCodes
  };
})();
