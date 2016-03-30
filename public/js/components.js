"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Store = require("./store");
var Actions = require("./actions");
var _ = require('underscore');

var App = React.createClass({
  displayName: "App",

  getStoreState: function getStoreState() {
    return {
      showScreen: Store.getShowScreen(),
      showStartBtn: Store.showStartBtn(),
      word: Store.getWord(),
      wordMax: Store.getWordMax(),
      guessedLetters: Store.getGuessedLetters(),
      remainingGuesses: Store.getRemainingGuesses()
    };
  },

  getInitialState: function getInitialState() {
    return this.getStoreState();
  },

  componentDidMount: function componentDidMount() {
    Store.on('change', this.onChange, this);
  },

  componentWillUnmount: function componentWillUnmount() {
    activeTasksStore.off('change', this.onChange, this);
  },

  onChange: function onChange() {
    this.setState(this.getStoreState());
  },

  render: function render() {
    switch (this.state.showScreen) {
      case 'start':
        return React.createElement(
          "div",
          { id: "start-screen" },
          React.createElement(StartPlayingWordInput, {
            word: this.state.word,
            wordMax: this.state.wordMax
          }),
          React.createElement(StartBtn, { showStartBtn: this.state.showStartBtn })
        );
      case 'game':
        return React.createElement(
          "div",
          { id: "game-screen" },
          React.createElement(Alphabet, null),
          React.createElement(Hangman, null),
          React.createElement(GuessBox, null),
          React.createElement(HiddenWord, { word: this.state.word })
        );

      case 'result':
      default:
        return null;
    };
  }
});

/*--------------------StartScreen--------------------------*/
var StartPlayingWordInput = React.createClass({
  displayName: "StartPlayingWordInput",

  getInitialState: function getInitialState() {
    return {
      value: this.props.word,
      wordMax: this.props.wordMax
    };
  },
  handleChange: function handleChange(e) {
    var word = e.target.value;
    var max = this.state.wordMax;
    word = word.substr(0, max);

    this.setState({ value: word });
    Actions.startWordTyping(word);
  },
  keepFocus: function keepFocus() {
    ReactDOM.findDOMNode(this.refs.wordinput).focus();
  },
  componentDidMount: function componentDidMount() {
    this.keepFocus();
  },
  keyUp: function keyUp(e) {
    if (e.which === 13) {
      Actions.wordSumbitted();
    }
  },
  maxReachedMessage: function maxReachedMessage() {
    if (this.state.value.length === this.state.wordMax) {
      return React.createElement(
        "div",
        { id: "max-letter" },
        this.state.wordMax + ' letter limit'
      );
    }
    return '';
  },
  render: function render() {
    var word = this.state.value === '' ? "Type a word" : this.state.value;
    var maxReachedMessage = this.maxReachedMessage();
    return React.createElement(
      "div",
      { id: "start-word" },
      React.createElement("input", {
        onChange: this.handleChange,
        onKeyUp: this.keyUp,
        onBlur: this.keepFocus,
        value: this.state.value,
        ref: "wordinput",
        placeholder: "Type a word"
      }),
      React.createElement(
        "div",
        { id: "show-word" },
        word
      ),
      maxReachedMessage
    );
  }
});

var StartBtn = React.createClass({
  displayName: "StartBtn",

  startBtn: function startBtn() {
    return React.createElement("input", {
      id: "start-btn",
      type: "submit",
      value: "Start Game",
      onClick: this.handleClick });
  },

  handleClick: function handleClick(e) {
    Actions.wordSumbitted();
  },

  render: function render() {
    var startBtn;

    if (this.props.showStartBtn) {
      return this.startBtn();
    }

    return null;
  }
});

/*--------------------GameScreen--------------------------*/
var Hangman = React.createClass({
  displayName: "Hangman",

  render: function render() {
    return React.createElement(
      "div",
      { id: "hangman" },
      "Remaining"
    );
  }
});
var Alphabet = React.createClass({
  displayName: "Alphabet",

  render: function render() {
    return React.createElement(
      "div",
      { id: "alphabet", className: "middle-row" },
      "abcdefghijklmnopqrstuvwxyz"
    );
  }
});
var GuessBox = React.createClass({
  displayName: "GuessBox",

  getInitialState: function getInitialState() {
    return {
      letter: ''
    };
  },
  handleChange: function handleChange(e) {
    var letter = e.target.value;
    letter = letter.substr(0, 1);
    this.setState({ value: letter });
    Actions.guess(letter);
  },
  keyUp: function keyUp(e) {
    if (e.which === 13) {
      Actions.guessSumbitted(this.state.letter);
    }
  },
  clear: function clear() {
    this.setState({ value: '' });
  },
  keepFocus: function keepFocus() {
    ReactDOM.findDOMNode(this.refs.letterinput).focus();
  },
  componentDidMount: function componentDidMount() {
    this.keepFocus();
  },
  render: function render() {
    var letter = this.state.letter;
    return React.createElement(
      "div",
      { id: "guessbox", className: "middle-row" },
      React.createElement(
        "div",
        { id: "text" },
        "Type a letter and press enter to guess:"
      ),
      React.createElement("input", {
        onChange: this.handleChange,
        onKeyDown: this.clear,
        onKeyUp: this.keyUp,
        onBlur: this.keepFocus,
        value: this.state.value,
        ref: "letterinput"
      }),
      React.createElement(
        "div",
        { id: "show-letter" },
        letter
      )
    );
  }
});
var HiddenWord = React.createClass({
  displayName: "HiddenWord",

  getInitialState: function getInitialState() {
    return {
      word: this.props.word
    };
  },

  hideWord: function hideWord() {
    var wordArray = this.state.word.split('');
    return wordArray.map(function (letter, i) {
      return React.createElement(
        "span",
        { data: i },
        letter
      );
    });
  },

  render: function render() {
    var hiddenword = this.hideWord();
    return React.createElement(
      "div",
      { id: "hidden-word" },
      hiddenword
    );
  }
});

/*--------------------ResultScreen--------------------------*/

/*--------------------RenderAll--------------------------*/
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
