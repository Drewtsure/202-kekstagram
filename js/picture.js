'use strict';

(function () {
  window.picture = {
    createPicture: function (element, photo) {
      photo.querySelector('.picture__img').src = element.url;
      photo.querySelector('.picture__likes').textContent = element.likes;
      photo.querySelector('.picture__comments').textContent = element.comments.length;
    }
  };
})();
