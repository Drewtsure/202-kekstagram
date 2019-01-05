'use strict';

var PHOTOS_QUANTITY = 25;
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

var KeyCodes = {
  ESC: 27
};

var efectsNames = {
  CHROME: 'effects__preview--chrome',
  SEPIA: 'effects__preview--sepia',
  MARVIN: 'effects__preview--marvin',
  PHOBOS: 'effects__preview--phobos',
  HEAT: 'effects__preview--heat'
};

var scaleValues = {
  MIN: 25,
  MAX: 100,
  STEP: 25
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
      avatar: FILES_URL.img + getRamdomValue(1, COMMENTS.avatars) + FILES_TYPE.svg,
      message: COMMENTS.list[getRamdomValue(0, COMMENTS.list.length)],
      name: COMMENTS.names[getRamdomValue(0, COMMENTS.names.length)]
    };
  }

  return comment;
};

// Функация, возвращающая массив заданного количества объектов с данными о фотографиях
var createPhotosArray = function (quantity) {
  var array = [];
  for (var i = 0; i < quantity; i++) {
    array[i] = {
      url: FILES_URL.photo + (i + 1) + FILES_TYPE.jpg,
      likes: getRamdomValue(LIKES_QUANTITY.min, LIKES_QUANTITY.max),
      comments: getRandomComments(getRamdomValue(1, COMMENTS.max))
    };
  }

  return array;
};

// Функция, возвращающая фрагмент с фотографиями, созданными по шаблону
var createPhotosFragment = function (array) {
  var photosFragment = document.createDocumentFragment();
  var fotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  array.forEach(function (element) {
    var photo = fotoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = element.url;
    photo.querySelector('.picture__likes').textContent = element.likes;
    photo.querySelector('.picture__comments').textContent = element.comments.length;
    photosFragment.appendChild(photo);
  });

  return photosFragment;
};

// Функция замены данных в увеличенном изображении
var fillBigPicture = function (picture, pictureData) {
  picture.querySelector('.big-picture__img img').src = pictureData.url;
  picture.querySelector('.social__caption').textContent = COMMENTS.titles[getRamdomValue(0, COMMENTS.titles.length)];
  picture.querySelector('.likes-count').textContent = pictureData.likes;
  picture.querySelector('.comments-count').textContent = pictureData.comments.length;

  var commentFragment = document.createDocumentFragment();
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  pictureData.comments.forEach(function (element) {
    var comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    commentFragment.appendChild(comment);
  });

  var comments = picture.querySelector('.social__comments');
  var commentsList = comments.querySelectorAll('.social__comment');
  commentsList.forEach(function (el) {
    comments.removeChild(el);
  });
  comments.appendChild(commentFragment);

  picture.querySelector('.social__comment-count').classList.add('visually-hidden');
  picture.querySelector('.comments-loader').classList.add('visually-hidden');
};

// Создание, наполнение и добавление на страницу фотографий пользователей
var photosList = createPhotosArray(PHOTOS_QUANTITY);
var pictures = document.querySelector('.pictures');
pictures.appendChild(createPhotosFragment(photosList));

// Поиск и заполнение информации об обной из фотографий из созданного раньше массива с данными фотографий пользователей
var bigPicture = document.querySelector('.big-picture');
fillBigPicture(bigPicture, photosList[0]);

// Открытие и закрытие окна при загрузке нового изображения
var uploadFileInput = document.querySelector('#upload-file');
var uploadedImageOverlay = document.querySelector('.img-upload__overlay');
var uploadCloseButton = uploadedImageOverlay.querySelector('.img-upload__cancel');

var onNewPhotoUpload = function () {
  uploadedImageOverlay.classList.remove('hidden');

  uploadCloseButton.addEventListener('click', onClosePhotoClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

var onClosePhotoClick = function () {
  uploadedImageOverlay.classList.add('hidden');
  uploadFileInput.value = '';

  uploadCloseButton.removeEventListener('click', onClosePhotoClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

var onDocumentKeydown = function (evt) {
  if (evt.keyCode === KeyCodes.ESC) {
    onClosePhotoClick();
  }
};

uploadFileInput.addEventListener('change', onNewPhotoUpload);

// Переключение эффектов
var effectsRadioList = uploadedImageOverlay.querySelectorAll('.effects__radio');
var imagePreview = uploadedImageOverlay.querySelector('.img-upload__preview');
var imageElement = uploadedImageOverlay.querySelector('.img-upload__preview img');

var effectsLevelWrapper = uploadedImageOverlay.querySelector('.img-upload__effect-level');
effectsLevelWrapper.classList.add('visually-hidden');

var getEffectType = function (effectName) {
  switch (effectName) {
    case 'effect-none':
      return '';
    case 'effect-chrome':
      return efectsNames.CHROME;
    case 'effect-sepia':
      return efectsNames.SEPIA;
    case 'effect-marvin':
      return efectsNames.MARVIN;
    case 'effect-phobos':
      return efectsNames.PHOBOS;
    case 'effect-heat':
      return efectsNames.HEAT;
    default:
      return '';
  }
};

effectsRadioList.forEach(function (element) {
  element.addEventListener('click', function (evt) {
    var effectClass = getEffectType(evt.target.id);
    if (effectClass !== '') {
      imageElement.className = effectClass;
      effectsLevelWrapper.classList.remove('visually-hidden');
      return;
    }
    imageElement.className = '';
    effectsLevelWrapper.classList.add('visually-hidden');
  });
});

// Изменение масштаба изображения
var smallerScaleButton = uploadedImageOverlay.querySelector('.scale__control--smaller');
var biggerScaleButton = uploadedImageOverlay.querySelector('.scale__control--bigger');
var scaleValueInput = uploadedImageOverlay.querySelector('.scale__control--value');

var setScale = function (scale) {
  scaleValueInput.value = scale + '%';
  imagePreview.style.transform = scale < scaleValues.MAX ? 'scale(0.' + scale + ')' : 'scale(1)';
};

smallerScaleButton.addEventListener('click', function () {
  var scaleInt = parseInt(scaleValueInput.value, 10);
  if (scaleInt >= (scaleValues.MIN + scaleValues.STEP)) {
    scaleInt -= scaleValues.STEP;
  }
  setScale(scaleInt);
});

biggerScaleButton.addEventListener('click', function () {
  var scaleInt = parseInt(scaleValueInput.value, 10);
  if (scaleInt <= (scaleValues.MAX - scaleValues.STEP)) {
    scaleInt += scaleValues.STEP;
  }
  setScale(scaleInt);
});
