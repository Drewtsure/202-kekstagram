'use strict';

(function () {
  window.preview = {
    // Функция создание увеличенного изображения из данных фотографии
    create: function (picture, pictureData) {
      picture.querySelector('.big-picture__img img').src = pictureData.url;
      picture.querySelector('.social__caption').textContent = pictureData.description;
      picture.querySelector('.likes-count').textContent = pictureData.likes;
      picture.querySelector('.comments-count').textContent = pictureData.comments.length;

      // Удаление старых комментариев
      var comments = picture.querySelector('.social__comments');
      var commentsList = comments.querySelectorAll('.social__comment');
      commentsList.forEach(function (element) {
        comments.removeChild(element);
      });

      // Создание и добавление новых комментариев
      var commentFragment = document.createDocumentFragment();
      var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
      pictureData.comments.forEach(function (element) {
        var comment = commentTemplate.cloneNode(true);
        comment.querySelector('.social__picture').src = element.avatar;
        comment.querySelector('.social__picture').alt = element.name;
        comment.querySelector('.social__text').textContent = element.message;
        commentFragment.appendChild(comment);
      });
      comments.appendChild(commentFragment);

      // Пока что удаление блоков с числом комментариев и числом лайков
      picture.querySelector('.social__comment-count').classList.add('visually-hidden');
      picture.querySelector('.comments-loader').classList.add('visually-hidden');
    }
  };
})();
