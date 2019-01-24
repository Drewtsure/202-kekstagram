'use strict';

(function () {
  var bodyPage = document.querySelector('body');
  var photosWrapper = document.querySelector('.pictures');
  var bigPhoto = document.querySelector('.big-picture');
  var bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');
  var filterBlock = document.querySelector('.img-filters');

  var downloadedPhotos;

  var onBigPhotoCloseClick = function (evt) {
    evt.preventDefault();
    bigPhoto.classList.add('hidden');
    bodyPage.classList.remove('modal-open');

    bigPhotoClose.removeEventListener('click', onBigPhotoCloseClick);
    document.removeEventListener('keydown', onDocumentKeyPress);
  };

  var onDocumentKeyPress = function (evt) {
    if (window.utils.isKeyEsc(evt)) {
      onBigPhotoCloseClick(evt);
    }
  };

  // Функция, возвращающая фрагмент с фотографиями, созданными по шаблону
  var fillPhotosWrapper = function (photos) {
    var photosFragment = document.createDocumentFragment();
    var fotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

    photos.forEach(function (element) {
      var photo = fotoTemplate.cloneNode(true);
      window.picture.create(element, photo);
      photosFragment.appendChild(photo);

      photo.addEventListener('click', function (evt) {
        evt.preventDefault();
        // Вывод увеличенной копии
        bigPhoto.querySelector('.comments-loader').classList.remove('hidden');
        window.preview.create(bigPhoto, element);
        bigPhoto.classList.remove('hidden');
        bodyPage.classList.add('modal-open');

        bigPhotoClose.addEventListener('click', onBigPhotoCloseClick);
        document.addEventListener('keydown', onDocumentKeyPress);
      });
    });

    photosWrapper.appendChild(photosFragment);
  };

  var showPhotosAndFilter = function (photos) {
    // Показ загруженных изображений и блока с фильтрами
    fillPhotosWrapper(photos);
    filterBlock.classList.remove('img-filters--inactive');

    // Полная копия массива с загруженными фотографиями
    downloadedPhotos = photos.slice();
    window.gallery.downloadedPhotos = downloadedPhotos;
  };

  // Загрузка, наполнение и добавление на страницу фотографий пользователей
  window.backend.download(showPhotosAndFilter, window.errorMessage.show);

  // Очистка фотографий на странице
  var clearPhotos = function () {
    var photos = photosWrapper.querySelectorAll('.picture');
    photos.forEach(function (element) {
      photosWrapper.removeChild(element);
    });
  };

  window.gallery = {
    clearPhotos: clearPhotos,
    fillPhotosWrapper: fillPhotosWrapper
  };
})();
