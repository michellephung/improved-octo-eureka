var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function hello() {
  console.log("hello");
}

var Store = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case Constants.TODO_CREATE:
      hello();
      Store.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = Store;
