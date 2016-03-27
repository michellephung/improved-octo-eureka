requirejs(["../build/store", "../build/actions", "../build/dispatcher"], function (Store, Actions, Dispatcher) {

  var App = React.createClass({
    displayName: "App",

    render: function () {
      return React.createElement(
        "div",
        null,
        React.createElement(StartPlayingWordInput, null),
        React.createElement(StartBtn, null)
      );
    }
  });

  var StartPlayingWordInput = React.createClass({
    displayName: "StartPlayingWordInput",

    handleChange: function () {
      Actions.startWordTyping();
    },
    render: function () {
      return React.createElement("input", {
        onChange: this.handleChange,
        placeholder: "Type a word" });
    }
  });

  var StartBtn = React.createClass({
    displayName: "StartBtn",

    startBtn: function () {
      return React.createElement("input", { type: "submit", text: "Start" });
    },

    handleClick: function () {
      console.log("click");
    },

    render: function () {
      var startBtn;

      if (this.props.showStartBtn) {
        return this.startBtn();
      }

      return null;
    }
  });

  ReactDOM.render(React.createElement(App, null), document.getElementById('html-hook'));
});