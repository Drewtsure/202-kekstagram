'use strict';

(function () {
  var photosWrapper = document.querySelector('.pictures');
  var bigPhoto = document.querySelector('.big-picture');
  var filters = document.querySelector('.img-filters');

  var downloadedPhotos;

  // Функция, возвращающая фрагмент с фотографиями, созданными по шаблону
  var fillPhotosWrapper = function (photos) {
    var photosFragment = document.createDocumentFragment();
    var fotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

    photos.forEach(function (element) {
      var photo = fotoTemplate.cloneNode(true);
      window.picture.create(element, photo);
      photosFragment.appendChild(photo);
    });

    photosWrapper.appendChild(photosFragment);
  };

  var processDownloadedPhotos = function (photos) {
    // Показ загруженных изображений и блока с фильтрами
    fillPhotosWrapper(photos);
    filters.classList.remove('img-filters--inactive');

    // Вывод увеличенной копии первого из загруженных из сети изображений
    window.preview.create(bigPhoto, photos[0]);

    // Полная копия массива с загруженными фотографиями
    downloadedPhotos = photos.slice();
    window.gallery.downloadedPhotos = downloadedPhotos;
  };

  // Загрузка, наполнение и добавление на страницу фотографий пользователей
  window.backend.download(processDownloadedPhotos, window.errorMessage.show);

  // Очистка фотографий на странице
  var clearPhotos = function () {
    var photosOnPage = photosWrapper.querySelectorAll('.picture');
    photosOnPage.forEach(function (element) {
      photosWrapper.removeChild(element);
    });
  };

  window.gallery = {
    clearPhotos: clearPhotos,
    fillPhotosWrapper: fillPhotosWrapper
  };
})();
