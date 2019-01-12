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

var Effect = {
  ORIGIN: {
    id: 'effect-none',
    name: '',
    filter: '',
    points: '',
    min: 0,
    max: 100
  },
  CHROME: {
    id: 'effect-chrome',
    name: 'effects__preview--chrome',
    filter: 'grayscale',
    points: '',
    min: 0,
    max: 1
  },
  SEPIA: {
    id: 'effect-sepia',
    name: 'effects__preview--sepia',
    filter: 'sepia',
    points: '',
    min: 0,
    max: 1
  },
  MARVIN: {
    id: 'effect-marvin',
    name: 'effects__preview--marvin',
    filter: 'invert',
    points: '%',
    min: 0,
    max: 100
  },
  PHOBOS: {
    id: 'effect-phobos',
    name: 'effects__preview--phobos',
    filter: 'blur',
    points: 'px',
    min: 0,
    max: 3
  },
  HEAT: {
    id: 'effect-heat',
    name: 'effects__preview--heat',
    filter: 'brightness',
    points: '',
    min: 1,
    max: 3
  }
};

var EffectLevel = {
  MIN: 0,
  MID: 50,
  MAX: 100
};

var ScaleValue = {
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
var textDescription = uploadedImageOverlay.querySelector('.text__description');

// Установка параметров для браузерной валидации
var setValidationAttributes = function () {
  textDescription.setAttribute('maxlength', '140');
};


var onNewPhotoUpload = function () {
  uploadedImageOverlay.classList.remove('hidden');
  setValidationAttributes();

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
  if (evt.keyCode === KeyCodes.ESC && evt.target !== textDescription) {
    onClosePhotoClick();
  }
};

uploadFileInput.addEventListener('change', onNewPhotoUpload);

// Переключение эффектов
var effectsRadioList = uploadedImageOverlay.querySelectorAll('.effects__radio');
var imagePreview = uploadedImageOverlay.querySelector('.img-upload__preview');
var imageElement = uploadedImageOverlay.querySelector('.img-upload__preview img');

var effectLevelWrapper = uploadedImageOverlay.querySelector('.img-upload__effect-level');
var effectLevelPin = effectLevelWrapper.querySelector('.effect-level__pin');
var effectLevelLine = effectLevelWrapper.querySelector('.effect-level__line');
var effectLevelDepth = effectLevelWrapper.querySelector('.effect-level__depth');
var effectLevelInput = effectLevelWrapper.querySelector('.effect-level__value');
effectLevelWrapper.classList.add('visually-hidden');

var effectType;

var getEffectType = function (effectName) {
  switch (effectName) {
    case Effect.ORIGIN.id:
      return Effect.ORIGIN;
    case Effect.CHROME.id:
      return Effect.CHROME;
    case Effect.SEPIA.id:
      return Effect.SEPIA;
    case Effect.MARVIN.id:
      return Effect.MARVIN;
    case Effect.PHOBOS.id:
      return Effect.PHOBOS;
    case Effect.HEAT.id:
      return Effect.HEAT;
    default:
      return '';
  }
};

// Навешивание обработчиков клика на все типы эффектов
effectsRadioList.forEach(function (element) {
  element.addEventListener('click', function (evt) {
    effectType = getEffectType(evt.target.id);
    if (effectType.name !== '') {
      setEffectLevel(effectType, EffectLevel.MAX);
      return;
    }
    setEffectLevel(effectType);
  });
});

var setEffectLevel = function (effect, level) {
  if (effect.name !== '') {
    // Применение фильтра к фотографии
    imageElement.className = effect.name;
    var relativeLevel = effect.min + (level / EffectLevel.MAX) * (effect.max - effect.min);
    imageElement.style.filter = effect.filter + '(' + relativeLevel + effect.points + ')';
    effectLevelInput.setAttribute('value', relativeLevel);
    effectLevelWrapper.classList.remove('visually-hidden');

    // Задание положения ползунка и уровня эффекта
    effectLevelPin.style.left = level + '%';
    effectLevelDepth.style.width = level + '%';
    return;
  }

  // Сбрасывание эффекта при выборе эффекта «Оригинал»
  imageElement.style = '';
  imageElement.className = '';
  effectLevelWrapper.classList.add('visually-hidden');
};

// Обработка события перетаскивания пина эффекта

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var pinStartIndent = evt.clientX;

  var onPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var pinShift = pinStartIndent - moveEvt.clientX;
    pinStartIndent = moveEvt.clientX;

    var effectLevelLineRect = effectLevelLine.getBoundingClientRect();
    var pinIndent = (pinStartIndent - pinShift - effectLevelLineRect.left) / effectLevelLine.offsetWidth * EffectLevel.MAX;
    if (pinIndent > EffectLevel.MIN && pinIndent < EffectLevel.MAX) {
      setEffectLevel(effectType, pinIndent);
      return;
    }

    // Установка крайних положений при выходе за границы полосы фильтра
    switch (pinIndent < EffectLevel.MID) {
      case true:
        setEffectLevel(effectType, EffectLevel.MIN);
        break;
      case false:
        setEffectLevel(effectType, EffectLevel.MAX);
        break;
    }
  };

  var onPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
});

// Изменение масштаба изображения
var smallerScaleButton = uploadedImageOverlay.querySelector('.scale__control--smaller');
var biggerScaleButton = uploadedImageOverlay.querySelector('.scale__control--bigger');
var scaleValueInput = uploadedImageOverlay.querySelector('.scale__control--value');

var setScale = function (scale) {
  scaleValueInput.value = scale + '%';
  imagePreview.style.transform = scale < ScaleValue.MAX ? 'scale(0.' + scale + ')' : 'scale(1)';
};

smallerScaleButton.addEventListener('click', function () {
  var scaleInt = parseInt(scaleValueInput.value, 10);
  if (scaleInt >= (ScaleValue.MIN + ScaleValue.STEP)) {
    scaleInt -= ScaleValue.STEP;
  }
  setScale(scaleInt);
});

biggerScaleButton.addEventListener('click', function () {
  var scaleInt = parseInt(scaleValueInput.value, 10);
  if (scaleInt <= (ScaleValue.MAX - ScaleValue.STEP)) {
    scaleInt += ScaleValue.STEP;
  }
  setScale(scaleInt);
});
