'use strict';

(function () {
  var COMMENTS_TO_SHOW = 5;

  window.preview = {
    // Функция создание увеличенного изображения из данных фотографии
    create: function (picture, pictureData) {
      var commentCountWrapper = picture.querySelector('.social__comment-count');
      var commentLoader = picture.querySelector('.comments-loader');

      picture.querySelector('.big-picture__img img').src = pictureData.url;
      picture.querySelector('.social__caption').textContent = pictureData.description;
      picture.querySelector('.likes-count').textContent = pictureData.likes;
      var commentsCount = pictureData.comments.length;

      // Удаление содержимого блока со счётчиком комментариев и новое наполнение его
      while (commentCountWrapper.firstChild) {
        commentCountWrapper.removeChild(commentCountWrapper.firstChild);
      }
      var commentsCountCode = '<span class="comments-count">' + commentsCount + '<span>';
      var visibleCommentsCount = commentsCount < COMMENTS_TO_SHOW ? commentsCount : COMMENTS_TO_SHOW;
      commentCountWrapper.insertAdjacentHTML('afterbegin', visibleCommentsCount + ' из ' + commentsCountCode + ' комментариев');

      // Удаление старых комментариев
      var comments = picture.querySelector('.social__comments');
      var commentsList = comments.querySelectorAll('.social__comment');
      commentsList.forEach(function (element) {
        comments.removeChild(element);
      });

      // Скрытие кнопки для загрузки новых комментариев, если уже все загружены
      if (visibleCommentsCount >= commentsCount) {
        commentLoader.classList.add('hidden');
      }

      // Создание и добавление новых комментариев
      var commentFragment = document.createDocumentFragment();
      var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

      for (var i = 0; i < COMMENTS_TO_SHOW && i < commentsCount; i++) {
        var comment = commentTemplate.cloneNode(true);
        comment.querySelector('.social__picture').src = pictureData.comments[i].avatar;
        comment.querySelector('.social__picture').alt = pictureData.comments[i].name;
        comment.querySelector('.social__text').textContent = pictureData.comments[i].message;

        commentFragment.appendChild(comment);
      }

      comments.appendChild(commentFragment);
    }
  };
})();
