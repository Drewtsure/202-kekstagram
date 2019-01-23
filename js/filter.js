'use strict';

(function () {
  var NEW_QUANTITY = 10;
  var DEBOUNCE_TIMEOUT = 500;

  var filters = document.querySelector('.img-filters');
  var filterPopular = filters.querySelector('#filter-popular');
  var filterNew = filters.querySelector('#filter-new');
  var filterDiscussed = filters.querySelector('#filter-discussed');

  // Переключение активного фильтра
  var setFilterActive = function (evt) {
    filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  };

  // Обработка кликов по пунктам фильтрации Popular, New и Discussed
  var lastTimeout;

  filterPopular.addEventListener('click', function (evt) {
    setFilterActive(evt);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.gallery.clearPhotos();
      window.gallery.fillPhotosWrapper(window.gallery.downloadedPhotos);
    }, DEBOUNCE_TIMEOUT);
  });

  filterNew.addEventListener('click', function (evt) {
    setFilterActive(evt);
    var startIndex = window.utils.getRandomValue(0, window.gallery.downloadedPhotos.length - NEW_QUANTITY);
    var newPhotos = window.gallery.downloadedPhotos.slice(startIndex, startIndex + NEW_QUANTITY);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.gallery.clearPhotos();
      window.gallery.fillPhotosWrapper(window.utils.shuffleArray(newPhotos));
    }, DEBOUNCE_TIMEOUT);
  });

  filterDiscussed.addEventListener('click', function (evt) {
    setFilterActive(evt);
    var newPhotos = window.gallery.downloadedPhotos.slice();
    newPhotos.sort(function (first, second) {
      var a = first.comments.length;
      var b = second.comments.length;
      switch (a < b) {
        case true:
          return 1;
        case false:
          return -1;
        default:
          return 0;
      }
    });
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.gallery.clearPhotos();
      window.gallery.fillPhotosWrapper(newPhotos);
    }, DEBOUNCE_TIMEOUT);
  });
})();
