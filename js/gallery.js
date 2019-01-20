'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');

  // Функция, возвращающая фрагмент с фотографиями, созданными по шаблону

  var photosFragment = document.createDocumentFragment();

  var fillPhotosFragment = function (photos) {
    var fotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

    photos.forEach(function (element) {
      var photo = fotoTemplate.cloneNode(true);
      window.picture.create(element, photo);
      photosFragment.appendChild(photo);
    });

    pictures.appendChild(photosFragment);

    // Вывод увеличенной копии первого из загруженных из сети изображений
    window.preview.create(bigPicture, photos[0]);
  };

  // Загрузка, наполнение и добавление на страницу фотографий пользователей
  window.backend.download(fillPhotosFragment, window.errorMessage.show);

})();
