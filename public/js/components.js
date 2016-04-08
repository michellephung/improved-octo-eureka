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
      remainingGuesses: Store.getRemainingGuesses(),
      isWinner: Store.getResults()
    };
  },

  getInitialState: function getInitialState() {
    return this.getStoreState();
  },

  componentDidMount: function componentDidMount() {
    Store.on('change', this.onChange, this);
  },

  componentWillUnmount: function componentWillUnmount() {
    Store.off('change', this.onChange, this);
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

        var guessedLetters = this.state.guessedLetters;
        return React.createElement(
          "div",
          { id: "game-screen" },
          React.createElement(Alphabet, { guessedLetters: guessedLetters }),
          React.createElement(Hangman, { remainingGuesses: this.state.remainingGuesses }),
          React.createElement(GuessBox, null),
          React.createElement(HiddenWord, {
            guessedLetters: guessedLetters,
            word: this.state.word
          })
        );

      case 'results':
        return React.createElement(
          "div",
          { id: "results-screen" },
          React.createElement(Results, {
            isWinner: this.state.isWinner,
            word: this.state.word
          })
        );
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
    word = word.substr(0, max).toLowerCase();
    word = this.validateword(word);
    this.setState({ value: word });
    Actions.startWordTyping(word);
  },

  validateword: function validateword(word) {
    var w = word.split('');
    var build = '';
    w.map(function (letter) {
      if (/([a-z])+/.test(letter)) {
        build += letter;
      }
    });

    return build;
  },

  keepFocus: function keepFocus() {
    ReactDOM.findDOMNode(this.refs.wordinput).focus();
  },

  componentDidMount: function componentDidMount() {
    this.keepFocus();
  },

  hideStartBtn: function hideStartBtn() {
    if (this.state.value === '') {
      Actions.hideStartBtn();
    }
  },

  keyUp: function keyUp(e) {
    this.hideStartBtn();
    if (e.which === 13 && this.state.value !== '') {
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

  getInitialState: function getInitialState() {
    return {
      remainingGuesses: this.props.remainingGuesses
    };
  },

  render: function render() {
    return React.createElement(
      "div",
      { id: "hangman", className: "middle-row" },
      React.createElement(
        "div",
        { className: "text" },
        "Remaining:"
      ),
      React.createElement(
        "div",
        { className: "big-text" },
        this.props.remainingGuesses
      )
    );
  }
});

var Alphabet = React.createClass({
  displayName: "Alphabet",


  alphabetSplit: function alphabetSplit() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    var guessObj = this.props.guessedLetters;
    var word = this.props.word;

    return alphabet.map(function (letter, i) {
      var guessedAlready = '';
      if (!_.isEmpty(guessObj)) {

        var guessed = guessObj.hasOwnProperty(letter);

        if (guessed && guessObj[letter] === "incorrectGuess") {
          guessedAlready = 'incorrect-guess';
        }
        if (guessed && guessObj[letter] === "correctGuess") {
          guessedAlready = 'correct-guess';
        }
      }

      return React.createElement(
        "span",
        { className: guessedAlready, key: i },
        letter
      );
    });
  },

  render: function render() {
    var alphabet = this.alphabetSplit();
    return React.createElement(
      "div",
      { id: "alphabet" },
      alphabet
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
    if (/([a-z])+/.test(letter)) {
      this.setState({ letter: letter });
    }
  },

  clear: function clear(e) {
    if (e.which === 13) {
      this.submitGuess();
    } else {
      this.setState({ letter: '' });
    }
  },

  submitGuess: function submitGuess() {
    Actions.guessSubmitted(this.state.letter);
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
        { className: "text" },
        "Type a letter and press enter to guess:"
      ),
      React.createElement("input", {
        onChange: this.handleChange,
        onKeyDown: this.clear,
        onBlur: this.keepFocus,
        value: this.state.letter,
        className: "big-text",
        ref: "letterinput"
      }),
      React.createElement(
        "button",
        {
          id: "submit-guess",
          onClick: this.submitGuess
        },
        "Guess: ",
        this.state.letter
      )
    );
  }
});

var HiddenWord = React.createClass({
  displayName: "HiddenWord",

  getInitialState: function getInitialState() {
    return {
      word: this.props.word,
      guessedLetters: this.props.guessedLetters
    };
  },

  hideWord: function hideWord() {
    var wordArray = this.props.word.split('');
    var guessObj = this.props.guessedLetters;

    return wordArray.map(function (letter, i) {
      if (!guessObj.hasOwnProperty(letter)) {
        letter = '_';
      }

      return React.createElement(
        "span",
        { className: "letters", key: i },
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
var Results = React.createClass({
  displayName: "Results",

  getResultsMsg: function getResultsMsg() {
    if (this.props.isWinner) {
      return "You Won!";
    }
    return "You Lost";
  },

  tryAgain: function tryAgain() {
    Actions.reset();
  },

  render: function render() {

    var results = this.getResultsMsg();
    var word = this.props.word;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "result" },
        results
      ),
      React.createElement(
        "div",
        null,
        "The word was [",
        word,
        "]"
      ),
      React.createElement(
        "a",
        { href: "#", onClick: this.tryAgain },
        "Try Again"
      )
    );
  }
});
/*--------------------RenderAll--------------------------*/
var renderApp = ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

module.exports = {
  App: App,
  StartPlayingWordInput: StartPlayingWordInput,
  StartBtn: StartBtn,
  Hangman: Hangman,
  Alphabet: Alphabet,
  GuessBox: GuessBox,
  HiddenWord: HiddenWord,
  Results: Results
};
