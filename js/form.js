'use strict';

(function () {
  var PIN_MOVING_STEP = 10;
  var COMMENT_MAX_LENGTH = '140';

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

  // Открытие и закрытие окна при загрузке нового изображения
  var uploadFormWrapper = document.querySelector('.img-upload');
  var form = uploadFormWrapper.querySelector('.img-upload__form');
  var formSubmit = form.querySelector('.img-upload__submit');
  var uploadFileInput = uploadFormWrapper.querySelector('#upload-file');
  var uploadedImageOverlay = uploadFormWrapper.querySelector('.img-upload__overlay');
  var uploadCloseButton = uploadedImageOverlay.querySelector('.img-upload__cancel');
  var textDescription = uploadedImageOverlay.querySelector('.text__description');
  var hashtagInput = uploadFormWrapper.querySelector('.text__hashtags');

  var resetUploadForm = function () {
    uploadedImageOverlay.classList.add('hidden');
    uploadFileInput.value = '';
    hashtagInput.value = '';
    textDescription.value = '';
    hashtagInput.style.borderColor = ('#fff');
    hashtagInput.style.boxShadow = ('inset 0 0 0 #fff');
  };

  var onNewPhotoUploadChange = function () {
    uploadedImageOverlay.classList.remove('hidden');
    textDescription.maxLength = COMMENT_MAX_LENGTH;
    setFilterType(Effect.ORIGIN, EffectLevel.MIN);
    uploadedImageOverlay.querySelector('input[id=' + Effect.ORIGIN.id + ']').checked = true;

    uploadCloseButton.addEventListener('click', onClosePhotoClick);
    document.addEventListener('keydown', onDocumentKeyPress);
    form.addEventListener('submit', onFormSubmit);
    formSubmit.addEventListener('click', onFormSubmitClick);
    hashtagInput.addEventListener('input', onHashtagInput);
  };

  var onClosePhotoClick = function () {
    resetUploadForm();

    uploadCloseButton.removeEventListener('click', onClosePhotoClick);
    document.removeEventListener('keydown', onDocumentKeyPress);
    form.removeEventListener('submit', onFormSubmit);
    formSubmit.removeEventListener('click', onFormSubmitClick);
    hashtagInput.removeEventListener('input', onHashtagInput);
  };

  var onDocumentKeyPress = function (evt) {
    if (window.utils.isKeyEsc(evt) && evt.target !== textDescription && evt.target !== hashtagInput) {
      onClosePhotoClick();
    }
  };

  var onFormSubmitClick = function () {
    window.hashtags.validate(hashtagInput);
  };

  var onHashtagInput = function () {
    hashtagInput.setCustomValidity('');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(form), function (response) {
      window.form.reset(uploadedImageOverlay, uploadFileInput);
      window.successMessage.show(response);
    }, window.errorMessage.show);
  };

  uploadFileInput.addEventListener('change', onNewPhotoUploadChange);

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
  var effectClass;

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
      return effectType.name === '' ? setFilterType(effectType, EffectLevel.MIN) : setFilterType(effectType, EffectLevel.MAX);
    });
  });

  var setFilterType = function (effect, level) {
    if (effect.name === '') {
      imageElement.style.filter = '';
      if (effectClass) {
        imageElement.classList.remove(effectClass);
      }
      effectLevelWrapper.classList.add('visually-hidden');
      setEffectLevel(effect, level);
      return;
    }

    effectClass = effect.name;
    imageElement.className = effectClass;
    effectLevelWrapper.classList.remove('visually-hidden');
    setEffectLevel(effect, level);
  };

  var setEffectLevel = function (effect, level) {
    // Применение фильтра к фотографии
    var relativeLevel = effect.min + (level / EffectLevel.MAX) * (effect.max - effect.min);
    imageElement.style.filter = effect.filter + '(' + relativeLevel + effect.points + ')';
    effectLevelInput.value = relativeLevel;

    // Задание положения ползунка и уровня эффекта
    effectLevelPin.style.left = level + '%';
    effectLevelDepth.style.width = level + '%';
  };

  var checkMovedPin = function (effect, level) {
    if (level > EffectLevel.MIN && level < EffectLevel.MAX) {
      setEffectLevel(effect, level);
      return;
    }

    // Установка крайних положений при выходе за границы полосы фильтра
    switch (level < EffectLevel.MID) {
      case true:
        setEffectLevel(effect, EffectLevel.MIN);
        break;
      case false:
        setEffectLevel(effect, EffectLevel.MAX);
        break;
      default:
        setEffectLevel(effect, EffectLevel.MAX);
    }
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
      checkMovedPin(effectType, pinIndent);
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });

  effectLevelPin.addEventListener('keydown', function (evt) {
    var pinStartIndent = effectLevelPin.getBoundingClientRect().left + (effectLevelPin.getBoundingClientRect().right - effectLevelPin.getBoundingClientRect().left) / 2;
    var effectLevelLineRect = effectLevelLine.getBoundingClientRect();
    var pinIndent;

    switch (evt.keyCode) {
      case window.utils.keyCodes.LEFT:
        pinIndent = (pinStartIndent - PIN_MOVING_STEP - effectLevelLineRect.left) / effectLevelLine.offsetWidth * EffectLevel.MAX;
        checkMovedPin(effectType, pinIndent);
        break;
      case window.utils.keyCodes.RIGHT:
        pinIndent = (pinStartIndent + PIN_MOVING_STEP - effectLevelLineRect.left) / effectLevelLine.offsetWidth * EffectLevel.MAX;
        checkMovedPin(effectType, pinIndent);
        break;
    }
  });

  // Обработка события клика по полосе эффекта
  effectLevelWrapper.addEventListener('click', function (evt) {
    evt.preventDefault();

    var effectLevelLineRect = effectLevelLine.getBoundingClientRect();
    var pinIndent = (evt.clientX - effectLevelLineRect.left) / effectLevelLine.offsetWidth * EffectLevel.MAX;
    checkMovedPin(effectType, pinIndent);
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
    var newScaleValue = scaleInt >= ScaleValue.MIN + ScaleValue.STEP ? scaleInt - ScaleValue.STEP : scaleInt;
    setScale(newScaleValue);
  });

  biggerScaleButton.addEventListener('click', function () {
    var scaleInt = parseInt(scaleValueInput.value, 10);
    var newScaleValue = scaleInt <= ScaleValue.MAX - ScaleValue.STEP ? scaleInt + ScaleValue.STEP : scaleInt;
    setScale(newScaleValue);
  });

  window.form = {
    reset: resetUploadForm
  };
})();
