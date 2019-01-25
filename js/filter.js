'use strict';

(function () {
  var NEW_QUANTITY = 10;

  var filterBlock = document.querySelector('.img-filters');
  var filterPopular = filterBlock.querySelector('#filter-popular');
  var filterNew = filterBlock.querySelector('#filter-new');
  var filterDiscussed = filterBlock.querySelector('#filter-discussed');
  var filterActive = filterBlock.querySelectorAll('.img-filters__button');

  // Переключение активного фильтра
  var setFilterActive = function (evt) {
    // filterBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    for (var i = 0; i < filterActive.length; i++) {
      if (filterActive[i].classList.contains('img-filters__button--active')) {
        filterActive[i].classList.remove('img-filters__button--active');
      }
    }
    evt.target.classList.add('img-filters__button--active');
  };

  // Обработка кликов по пунктам фильтрации Popular, New и Discussed
  var onFilterPopularClick = function (evt) {
    setFilterActive(evt);
    window.debounce(window.gallery.downloadedPhotos);
  };

  var onFilterNewClick = function (evt) {
    setFilterActive(evt);
    var startIndex = window.utils.getRandomValue(0, window.gallery.downloadedPhotos.length - NEW_QUANTITY);
    var newPhotos = window.gallery.downloadedPhotos.slice(startIndex, startIndex + NEW_QUANTITY);
    window.debounce(window.utils.shuffleArray(newPhotos));
  };

  var onFilterDiscussedClick = function (evt) {
    setFilterActive(evt);
    var newPhotos = window.gallery.downloadedPhotos.slice();
    newPhotos.sort(function (first, second) {
      var a = first.comments.length;
      var b = second.comments.length;
      return b - a;
    });
    window.debounce(newPhotos);
  };

  filterPopular.addEventListener('click', onFilterPopularClick);

  filterNew.addEventListener('click', onFilterNewClick);

  filterDiscussed.addEventListener('click', onFilterDiscussedClick);
})();
