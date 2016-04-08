'use strict';

var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('./ActionTypes');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {

  init: function init() {
    this._showScreen = 'start';
    this._showStartBtn = false;
    this._word = '';
    this._wordMax = 20;
    this._guessedLetters = {};
    this._remainingGuesses = 7;
    this._isWinner = false;
  },

  getWordMax: function getWordMax() {
    return this._wordMax;
  },

  getRemainingGuesses: function getRemainingGuesses() {
    return this._remainingGuesses;
  },

  getGuessedLetters: function getGuessedLetters() {
    return this._guessedLetters;
  },

  addGuessedLetter: function addGuessedLetter(letter) {
    if (!this._guessedLetters.hasOwnProperty(letter)) {

      var letterObject = {};
      letterObject[letter] = this.isLetterInWord(letter);
      if (this.isLetterInWord(letter) === 'incorrectGuess') {
        this._remainingGuesses--;
      }
      this._guessedLetters = assign(this._guessedLetters, letterObject);
    }
    this.checkForWinner();
  },

  getResults: function getResults() {
    return this._isWinner;
  },

  checkForWinner: function checkForWinner() {
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

  isLetterInWord: function isLetterInWord(letter) {
    var position = this._word.indexOf(letter);
    if (position > -1) {
      return 'correctGuess';
    }
    return 'incorrectGuess';
  },

  setShowStartBtn: function setShowStartBtn(bool) {
    this._showStartBtn = bool;
  },

  setShowScreen: function setShowScreen(screen) {
    this._showScreen = screen;
  },

  getShowScreen: function getShowScreen() {
    return this._showScreen;
  },

  showStartBtn: function showStartBtn() {
    return this._showStartBtn;
  },

  setWord: function setWord(word) {
    this._word = word.trim().toLowerCase();
  },

  getWord: function getWord() {
    return this._word;
  },

  hideStartBtn: function hideStartBtn() {
    this._showStartBtn = false;
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatch: function dispatch(action) {
    switch (action.type) {
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

      case ActionTypes.RESET:
        this.init();
        this.emitChange();

      default:
      // do nothing
    }
  }
});

Store.dispatchToken = AppDispatcher.register(Store.dispatch.bind(Store));

module.exports = Store;
