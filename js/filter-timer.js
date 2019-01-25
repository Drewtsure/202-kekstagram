'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;

  var lastTimeout;

  window.filterTimer = {
    set: function (array) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        window.gallery.clearPhotos();
        window.gallery.fillPhotosWrapper(array);
      }, DEBOUNCE_TIMEOUT);
    }
  };
})();
