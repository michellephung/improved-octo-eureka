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
    this._guessedLetters = {};
    this._remainingGuesses = 7;
    this._isWinner = false;
  },

  getWordMax: function () {
    return this._wordMax;
  },

  getRemainingGuesses: function () {
    return this._remainingGuesses;
  },

  getGuessedLetters: function () {
    return this._guessedLetters;
  },

  addGuessedLetter: function (letter) {
    if (!this._guessedLetters.hasOwnProperty(letter)) {
      this._remainingGuesses--;
      var letterObject = {};
      letterObject[letter] = this.isLetterInWord(letter);
      this._guessedLetters = assign(this._guessedLetters, letterObject);
    }
    this.checkForWinner();
  },

  getResults: function () {
    return this._isWinner;
  },

  checkForWinner: function () {
    var wordArray = this._word.split('');
    var winner = true;

    wordArray.map(function (letter) {
      if (!this._guessedLetters.hasOwnProperty(letter)) {
        winner = false;
        return false;
      }
    }.bind(this));

    if (this._remainingGuesses === 0 || winner === true) {
      this.setShowScreen('results');
    }

    this._isWinner = winner;  
  },

  isLetterInWord: function (letter) {
    var position = this._word.indexOf(letter);
    if(position > -1) {
      return 'correctGuess';
    }
    return 'incorrectGuess';
  },

  setShowStartBtn: function (bool) {
    this._showStartBtn = bool;
  },

  setShowScreen: function (screen) {
    this._showScreen = screen;
  },

  getShowScreen: function () {
    return this._showScreen;
  },

  showStartBtn: function () {
    return this._showStartBtn;
  },

  setWord: function (word) {
    this._word = word.trim().toLowerCase();
  },

  getWord:function () {
    return this._word;
  },

  hideStartBtn: function () {
    this._showStartBtn = false;
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
        this.addGuessedLetter(action.letter);
        this.emitChange();
        break;

      case ActionTypes.HIDE_START_BTN:
        this.hideStartBtn();
        this.emitChange();

      default:
        // do nothing
    }
  }
});

Store.dispatchToken = AppDispatcher.register(Store.dispatch.bind(Store));

module.exports = Store;
