'use strict';

var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function hello(a) {
  console.log("hello", a);
}

var Store = assign({}, EventEmitter.prototype, {

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case Constants.TYPING_START:
      hello(action.options);
      Store.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = Store;
