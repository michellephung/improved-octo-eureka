var React = require("react");
var ReactDOM = require("react-dom");
var Store = require("./store");
var Actions = require("./actions");

console.log("actions", Actions);

var App = React.createClass({
  render: function () {
    return (
      <div>
        <StartPlayingWordInput />
        <StartBtn />
      </div>
    );
  }
});


var StartPlayingWordInput = React.createClass({
  handleChange: function () {
    Actions.startWordTyping("j");
  },
  render: function () {
    return (
      <input 
        onChange={this.handleChange} 
        placeholder="Type a word" />
    );
  }
});


var StartBtn = React.createClass({
  startBtn: function () {
    return (
      <input type="submit" text="Start"/>
    );
  },

  handleClick: function () {
    console.log("click");
  },

  render: function () {
      var startBtn;

      if (this.props.showStartBtn) {
        return this.startBtn();
      }

      return <div>hi</div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

