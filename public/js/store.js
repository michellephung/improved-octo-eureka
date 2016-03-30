'use strict';

var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('./ActionTypes');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

var Store = assign({}, EventEmitter.prototype, {

  init: function init() {
    this._showScreen = 'start';
    this._showStartBtn = false;
    this._word = '';
    this._wordMax = 20;
  },

  getWordMax: function getWordMax() {
    return this._wordMax;
  },

  setShowStartBtn: function setShowStartBtn(bool) {
    this._showStartBtn = bool;
  },
  setShowScreen: function setShowScreen(screen) {
    console.log("setScreen", screen);
    this._showScreen = screen;
  },
  getShowScreen: function getShowScreen() {
    return this._showScreen;
  },
  showStartBtn: function showStartBtn() {
    return this._showStartBtn;
  },
  setWord: function setWord(word) {
    this._word = word.trim();
  },
  getWord: function getWord() {
    return this._word;
  },

  getGuessedLetters: function getGuessedLetters() {},

  getRemainingGuesses: function getRemainingGuesses() {},

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
