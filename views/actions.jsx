var AppDispatcher = require('./AppDispatcher');
var ActionTypes = require('./ActionTypes');

var Actions = {
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
  guessSumbitted: function (letter) {
    AppDispatcher.dispatch({
      type: ActionTypes.GUESS_LETTER,
      letter: letter
    });
  }
};

module.exports = Actions;
