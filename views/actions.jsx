var AppDispatcher = require('./AppDispatcher');
var Constants = require('./constants');

var Actions = {
  startWordTyping: function(options) {
    AppDispatcher.dispatch({
      actionType: Constants.TODO_CREATE,
      options: options
    });
  }
};

module.exports = Actions;
