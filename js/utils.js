'use strict';

(function () {
  // Функция, возвращающая случайное число из диапазона
  window.utils = {
    getRamdomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  };
})();
