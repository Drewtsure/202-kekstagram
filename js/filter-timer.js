'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  window.debounce = function (array) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.gallery.clearPhotos();
      window.gallery.fillPhotosWrapper(array);
    }, DEBOUNCE_INTERVAL);
  };
})();
