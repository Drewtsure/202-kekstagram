'use strict';

(function () {
  window.utils = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  };
})();
