define([
  'libs/flux'
], function (Flux) {
  
  var dispatcher = {};

  var Dispatcher = _.extend(Flux.Dispatcher.prototype, {
    hello: function(action) {
      console.log("hello");
      this.dispatch({
        source: 'HELLO',
        action: action
      });
    }
  });

  dispatcher = _.extend(dispatcher, Dispatcher);

  return dispatcher;
});