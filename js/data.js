'use strict';

(function () {
  var LIKES_QUANTITY = {
    min: 15,
    max: 200
  };
  var FILES_URL = {
    img: 'img/avatar-',
    photo: 'photos/'
  };
  var FILES_TYPE = {
    jpg: '.jpg',
    svg: '.svg'
  };
  var COMMENTS = {
    max: 4,
    avatars: 6,
    list: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
    names: ['Инокентий Рыбий Глаз', 'Ширик Вова', 'Даздраперма Прекрасная', 'Апполинария с Моноподом', 'Эдуард Суровый', 'Снежана Банана'],
    titles: ['Купил новую камеру, стал профессиональным фотографом!', 'Взял камеру погонять у сына, смотрите как я могу!', 'Это фото из моего портфолио, остальное могу прислать в личку...', 'Новый телефон фотографирует лучше камеры, продаю камеру!']
  };

  // Функция, возвращающая массив с заданным количеством комментариев
  var getRandomComments = function (quantity) {
    var comment = [];
    for (var i = 0; i < quantity; i++) {
      comment[i] = {
        avatar: FILES_URL.img + window.utils.getRandomValue(1, COMMENTS.avatars) + FILES_TYPE.svg,
        message: COMMENTS.list[window.utils.getRandomValue(0, COMMENTS.list.length)],
        name: COMMENTS.names[window.utils.getRandomValue(0, COMMENTS.names.length)]
      };
    }
    return comment;
  };

  // Функация, возвращающая массив заданного количества объектов с данными о фотографиях
  window.data = {
    createPhotosArray: function (quantity) {
      var array = [];
      for (var i = 0; i < quantity; i++) {
        array[i] = {
          url: FILES_URL.photo + (i + 1) + FILES_TYPE.jpg,
          likes: window.utils.getRandomValue(LIKES_QUANTITY.min, LIKES_QUANTITY.max),
          comments: getRandomComments(window.utils.getRandomValue(1, COMMENTS.max)),
          title: COMMENTS.titles[window.utils.getRandomValue(0, COMMENTS.titles.length)]
        };
      }
      return array;
    }
  };

})();
