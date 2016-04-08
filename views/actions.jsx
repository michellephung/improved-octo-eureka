var AppDispatcher = require('./AppDispatcher');
var ActionTypes = require('./ActionTypes');

var Actions = {
  reset: function () {
    AppDispatcher.dispatch({
      type: ActionTypes.RESET
    });
  },
  startWordTyping: function (word) {
    AppDispatcher.dispatch({
      type: ActionTypes.TYPING_START,
      word: word
    });
  },

  wordSumbitted: function () {
    AppDispatcher.dispatch({
      type: ActionTypes.START_GAME
    });
  },
  guessSubmitted: function (letter) {
    AppDispatcher.dispatch({
      type: ActionTypes.GUESS_LETTER,
      letter: letter
    });
  },
  hideStartBtn: function () {
    AppDispatcher.dispatch({
      type: ActionTypes.HIDE_START_BTN
    });
  }
  
};

module.exports = Actions;
