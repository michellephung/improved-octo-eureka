var AppDispatcher = require('./AppDispatcher');
var Constants = require('./constants');

var Actions = {
  startWordTyping: function(options) {
    AppDispatcher.dispatch({
      actionType: Constants.TYPING_START,
      options: options
    });
  }
};

module.exports = Actions;
