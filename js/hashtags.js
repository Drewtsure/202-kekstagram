'use strict';

(function () {
  var HASHTAGS_MAX_QUATITY = 5;
  var HASHTAG_MIN_LENGTH = 1;
  var HASHTAG_MAX_LENGTH = 20;

  var CustomValidationText = {
    NO_HASHTAG: 'Все хештеги должны начинаться с символа #. ',
    ONLY_ONE_SYMBOL: 'Хештег не может состоять из одного символа. ',
    NO_SPACE: 'Хештеги должны разделяться пробелами. ',
    TOO_MANY_HASHTAGS: 'Максимальное количество хештегов: ' + HASHTAGS_MAX_QUATITY + '. ',
    TOO_LONG_HASHTAG: 'Максимальная длина хештега: ' + HASHTAG_MAX_LENGTH + '. ',
    HASHTAG_DUBLICATE: 'Хештеги не должны повторяться. '
  };

  window.hashtags = {
    validate: function (input) {
      if (input.value) {
        var hashtags = input.value.replace(/\s\s+/g, ' ').trim().split(' ');
        var noHashtag = false;
        var onlyOneSymbol = false;
        var noSpace = false;
        var tooManyHashtags = false;
        var tooLongHashtag = false;
        var hashtagDublicate = false;
        var customMessage = '';

        var addToCustomMessage = function (checkingStatement, text) {
          if (checkingStatement) {
            customMessage += text;
          }
        };

        hashtags.forEach(function (element) {
          var oneHashtagSymbols = element.split('');

          // Проверка, что первый символ — хештег
          if (oneHashtagSymbols[0] !== '#') {
            noHashtag = true;
          }

          // Проверка, что хештег не может быть длиной 1 символ
          if (element.length === HASHTAG_MIN_LENGTH) {
            onlyOneSymbol = true;
          }

          // Проверка, что все хештеги разделяются пробелами
          var hashCount = 0;
          oneHashtagSymbols.forEach(function (symbol) {
            if (symbol === '#') {
              hashCount++;
            }
          });
          if (hashCount > 1) {
            noSpace = true;
          }

          // Проверка, что все длина хештега не может быть длиннее HASHTAG_MAX_LENGTH
          if (element.length > HASHTAG_MAX_LENGTH) {
            tooLongHashtag = true;
          }
        });

        // Проверка, что количество хештегов не может быть больше числа HASHTAGS_MAX_QUATITY
        if (hashtags.length > HASHTAGS_MAX_QUATITY) {
          tooManyHashtags = true;
        }

        // Проверка на дублирование хештегов
        for (var i = 0; i < hashtags.length - 1; i++) {
          for (var j = i + 1; j < hashtags.length; j++) {
            if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
              hashtagDublicate = true;
              break;
            }
          }
          if (hashtagDublicate) {
            break;
          }
        }

        // Сборка и вывод сообщения об ошибке, если хотя бы одна из них есть
        if (noHashtag || onlyOneSymbol || noSpace || tooManyHashtags || tooLongHashtag || hashtagDublicate) {
          addToCustomMessage(noHashtag, CustomValidationText.NO_HASHTAG);
          addToCustomMessage(onlyOneSymbol, CustomValidationText.ONLY_ONE_SYMBOL);
          addToCustomMessage(noSpace, CustomValidationText.NO_SPACE);
          addToCustomMessage(tooManyHashtags, CustomValidationText.TOO_MANY_HASHTAGS);
          addToCustomMessage(tooLongHashtag, CustomValidationText.TOO_LONG_HASHTAG);
          addToCustomMessage(hashtagDublicate, CustomValidationText.HASHTAG_DUBLICATE);

          input.setCustomValidity(customMessage);
          input.style.borderColor = ('red');
          input.style.boxShadow = ('inset 0 0 3px red');

        } else {
          input.setCustomValidity('');
          input.style.borderColor = ('#fff');
          input.style.boxShadow = ('inset 0 0 0 #fff');
        }
      }
    }
  };
})();
