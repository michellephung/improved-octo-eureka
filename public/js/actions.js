'use strict';

var AppDispatcher = require('./AppDispatcher');
var ActionTypes = require('./ActionTypes');

var Actions = {
  reset: function reset() {
    AppDispatcher.dispatch({
      type: ActionTypes.RESET
    });
  },
  startWordTyping: function startWordTyping(word) {
    AppDispatcher.dispatch({
      type: ActionTypes.TYPING_START,
      word: word
    });
  },

  wordSumbitted: function wordSumbitted() {
    AppDispatcher.dispatch({
      type: ActionTypes.START_GAME
    });
  },
  guessSubmitted: function guessSubmitted(letter) {
    AppDispatcher.dispatch({
      type: ActionTypes.GUESS_LETTER,
      letter: letter
    });
  },
  hideStartBtn: function hideStartBtn() {
    AppDispatcher.dispatch({
      type: ActionTypes.HIDE_START_BTN
    });
  }

};

module.exports = Actions;
