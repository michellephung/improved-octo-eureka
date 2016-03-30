var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('./ActionTypes');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

var Store = assign({}, EventEmitter.prototype, {

  init: function () {
    this._showScreen = 'start';
    this._showStartBtn = false;
    this._word = '';
    this._wordMax = 20;
  },

  getWordMax: function () {
    return this._wordMax;
  },

  setShowStartBtn: function (bool) {
    this._showStartBtn = bool;
  },
  setShowScreen: function (screen) {
    console.log("setScreen", screen);
    this._showScreen = screen;
  },
  getShowScreen: function () {
    return this._showScreen;
  },
  showStartBtn: function () {
    return this._showStartBtn;
  },
  setWord: function (word) {
    this._word = word.trim();
  },
  getWord:function () {
    return this._word;
  },

  getGuessedLetters:function () {

  },

  getRemainingGuesses:function () {

  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatch: function (action) {
    switch(action.type) {
      case ActionTypes.TYPING_START:
        this.setShowStartBtn(true);
        this.setWord(action.word);
        this.emitChange();
        break;

      case ActionTypes.START_GAME:
        this.setShowScreen('game');
        this.emitChange();
        break;

      case ActionTypes.GUESS_LETTER:
        console.log(action.letter);
        this.emitChange();
        break;

      default:
        // do nothing
    }
  }
});

Store.dispatchToken = AppDispatcher.register(Store.dispatch.bind(Store));

module.exports = Store;
