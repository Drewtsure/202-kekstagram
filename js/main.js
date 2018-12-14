'use strict';

var FOTOS_QUANTITY = 25;
var LIKES = {
  min: 15,
  max: 200
};
var COMMENTS = {
  max: 4,
  avatars: 6,
  list: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  names: ['Инокентий Рыбий Глаз', 'Ширик Вова', 'Даздраперма Прекрасная', 'Апполинария с Моноподом', 'Эдуард Суровый', 'Снежана Банана'],
  titles: ['Купил новую камеру, стал профессиональным фотографом!', 'Взял камеру погонять у сына, смотрите как я могу!', 'Это фото из моего портфолио, остальное могу прислать в личку...', 'Новый телефон фотографирует лучше камеры, продаю камеру!']
};

// Функция, возвращающая случайное число из диапазона
var getRamdomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция, возвращающая массив с заданным количеством комментариев
var getRandomComments = function (quantity) {
  var comment = [];
  for (var i = 0; i < quantity; i++) {
    comment[i] = {
      avatar: 'img/avatar-' + getRamdomValue(1, COMMENTS.avatars) + '.svg',
      message: COMMENTS.list[getRamdomValue(0, COMMENTS.list.length)],
      name: COMMENTS.names[getRamdomValue(0, COMMENTS.names.length)]
    };
  }

  return comment;
};

// Функация, возвращающая массив заданного количества объектов с данными о фотографиях
var createFotosArray = function (quantity) {
  var array = [];
  for (var i = 0; i < quantity; i++) {
    array[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRamdomValue(LIKES.min, LIKES.max),
      comments: getRandomComments(getRamdomValue(1, COMMENTS.max))
    };
  }

  return array;
};

// Функция, возвращающая фрагмент с фотографиями, созданными по шаблону
var createFotosFragment = function (array) {
  var fotosFragment = document.createDocumentFragment();
  var fotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  for (var i = 0; i < array.length; i++) {
    var photo = fotoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = array[i].url;
    photo.querySelector('.picture__likes').textContent = array[i].likes;
    photo.querySelector('.picture__comments').textContent = array[i].comments.length;
    fotosFragment.appendChild(photo);
  }

  return fotosFragment;
};

// Функция замены данных в увеличенном изображении
var fillBigPicture = function (picture, pictureData) {
  picture.querySelector('.big-picture__img img').src = pictureData.url;
  picture.querySelector('.social__caption').textContent = COMMENTS.titles[getRamdomValue(0, COMMENTS.titles.length)];
  picture.querySelector('.likes-count').textContent = pictureData.likes;
  picture.querySelector('.comments-count').textContent = pictureData.comments.length;

  var commentFragment = document.createDocumentFragment();
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  for (var i = 0; i < pictureData.comments.length; i++) {
    var comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = pictureData.comments[i].avatar;
    comment.querySelector('.social__picture').alt = pictureData.comments[i].name;
    comment.querySelector('.social__text').textContent = pictureData.comments[i].message;
    commentFragment.appendChild(comment);
  }

  var comments = picture.querySelector('.social__comments');
  var commentsList = comments.querySelectorAll('.social__comment');
  for (var j = 0; j < commentsList.length; j++) {
    comments.removeChild(commentsList[j]);
  }
  comments.appendChild(commentFragment);

  picture.querySelector('.social__comment-count').classList.add('visually-hidden');
  picture.querySelector('.comments-loader').classList.add('visually-hidden');
};

// Создание, наполнение и добавление на страницу фотографий пользователей
var fotosList = createFotosArray(FOTOS_QUANTITY);
var pictures = document.querySelector('.pictures');
pictures.appendChild(createFotosFragment(fotosList));

// Поиск и заполнение информации об обной из фотографий из созданного раньше массива с данными фотографий пользователей
var bigPicture = document.querySelector('.big-picture');
fillBigPicture(bigPicture, fotosList[0]);
bigPicture.classList.remove('hidden');
