"use strict";

console.log("v");

var React = require("react");
var ReactDOM = require("react-dom");
var Store = require("./store");
var Actions = require("./actions");

var App = React.createClass({
  displayName: "App",

  render: function render() {
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

  handleChange: function handleChange() {
    Actions.startWordTyping("j");
  },
  render: function render() {
    return React.createElement("input", {
      onChange: this.handleChange,
      placeholder: "Type a word" });
  }
});

var StartBtn = React.createClass({
  displayName: "StartBtn",

  startBtn: function startBtn() {
    return React.createElement("input", { type: "submit", text: "Start" });
  },

  handleClick: function handleClick() {
    console.log("click");
  },

  render: function render() {
    var startBtn;

    if (this.props.showStartBtn) {
      return this.startBtn();
    }

    return React.createElement(
      "div",
      null,
      "hi"
    );
  }
});

console.log(document.getElementById("app"));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

console.log("vx");
