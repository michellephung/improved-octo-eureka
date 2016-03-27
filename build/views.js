var App = React.createClass({
  displayName: "App",


  render: function () {
    return React.createElement(StartPlayingWordInput, null);
  }

});

var StartPlayingWordInput = React.createClass({
  displayName: "StartPlayingWordInput",

  getInitialState: function () {
    return null;
  },
  handleClick: function () {
    this.setState(function (state) {
      return { clickCount: state.clickCount + 1 };
    });
  },
  render: function () {
    return React.createElement("input", {
      onChange: this.handleChange,
      placeholder: "Type a word" });
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));