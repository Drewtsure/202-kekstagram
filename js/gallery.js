'use strict';

(function () {
  var PHOTOS_QUANTITY = 25;

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');

  // Функция, возвращающая фрагмент с фотографиями, созданными по шаблону
  var createPhotosFragment = function (array) {
    var photosFragment = document.createDocumentFragment();
    var fotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

    array.forEach(function (element) {
      var photo = fotoTemplate.cloneNode(true);
      window.picture.createPicture(element, photo);
      photosFragment.appendChild(photo);
    });

    return photosFragment;
  };

  // Создание, наполнение и добавление на страницу фотографий пользователей
  var photosList = window.data.createPhotosArray(PHOTOS_QUANTITY);
  pictures.appendChild(createPhotosFragment(photosList));

  // Поиск и заполнение информации об обной из фотографий из созданного раньше массива с данными фотографий пользователей
  window.preview.createPreview(bigPicture, photosList[0]);

})();
