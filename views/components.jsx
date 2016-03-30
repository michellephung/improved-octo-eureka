var React = require("react");
var ReactDOM = require("react-dom");
var Store = require("./store");
var Actions = require("./actions");
var _=require('underscore');

var App = React.createClass({
  getStoreState: function () {
    return {
      showScreen: Store.getShowScreen(),
      showStartBtn: Store.showStartBtn(),
      word: Store.getWord(),
      wordMax: Store.getWordMax(),
      guessedLetters: Store.getGuessedLetters(),
      remainingGuesses: Store.getRemainingGuesses(),
      isWinner: Store.getResults()
    }
  },
  
  getInitialState: function () {
    return this.getStoreState();
  },

  componentDidMount: function () {
    Store.on('change', this.onChange, this);
  },

  componentWillUnmount: function () {
    Store.off('change', this.onChange, this);
  },

  onChange: function () {
    this.setState(this.getStoreState());
  },

  render: function () {
    switch (this.state.showScreen) {
      case 'start':
        return (
          <div id="start-screen">
            <StartPlayingWordInput 
              word={this.state.word}
              wordMax={this.state.wordMax}
            />
            <StartBtn showStartBtn={this.state.showStartBtn} />
          </div>
        );
      case 'game':

        var guessedLetters = this.state.guessedLetters;
        return (
          <div id="game-screen">
            <Alphabet guessedLetters={guessedLetters} />
            <Hangman remainingGuesses={this.state.remainingGuesses}/>
            <GuessBox />
            <HiddenWord 
              guessedLetters={guessedLetters}
              word={this.state.word}
            />
          </div>
        );

      case 'results':
        return (
          <div id="results-screen">
            <Results 
              isWinner={this.state.isWinner} 
              word={this.state.word}
            />
          </div>
        );
      default:
        return null;
    };
  }
});

/*--------------------StartScreen--------------------------*/
var StartPlayingWordInput = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.word,
      wordMax: this.props.wordMax
    };
  },

  handleChange: function (e) {
    var word = e.target.value;
    var max = this.state.wordMax;
    word = word.substr(0, max).toLowerCase();
    word = this.validateword(word);
    this.setState({value: word});
    Actions.startWordTyping(word);
  },

  validateword: function (word) {

    var w = word.split('');
    var build = '';
    w.map(function (letter) {
      if(/([a-z])+/.test(letter)) {
        build += letter;
      }
    })
  
    return build;
  },

  hideStartBtn: function () {
    if (this.state.value === '') {
      Actions.hideStartBtn();
    }
  },

  keepFocus: function () {
    ReactDOM.findDOMNode(this.refs.wordinput).focus(); 
  },

  componentDidMount: function () {
    this.keepFocus(); 
  },

  keyUp: function (e) {
    this.keepFocus();
    this.hideStartBtn();
    if (e.which === 13 && this.state.value !== '') {
      Actions.wordSumbitted();
    }
  },

  maxReachedMessage: function () {
    if (this.state.value.length === this.state.wordMax) {
      return (
        <div id="max-letter">
          {this.state.wordMax + ' letter limit'}
        </div>
      );
    }
    return '';
  },

  render: function () {
    var word = this.state.value === '' ? "Type a word" : this.state.value;
    var maxReachedMessage = this.maxReachedMessage();
    return (
      <div id="start-word">
        <input
          onChange={this.handleChange}
          onKeyUp={this.keyUp}
          onBlur={this.keepFocus}
          value={this.state.value}
          ref='wordinput'
          placeholder="Type a word"
        />
        <div id="show-word">
          {word}
        </div>
        {maxReachedMessage}
      </div>
    );
  }
});

var StartBtn = React.createClass({
  startBtn: function () {
    return (
      <input 
        id="start-btn"
        type="submit"
        value="Start Game"
        onClick={this.handleClick} />
    );
  },

  handleClick: function (e) {
    Actions.wordSumbitted();
  },

  render: function () {
    var startBtn;

    if (this.props.showStartBtn) {
      return this.startBtn();
    }

    return null;
  }
});

/*--------------------GameScreen--------------------------*/
var Hangman = React.createClass({
  getInitialState: function () {
    return {
      remainingGuesses: this.props.remainingGuesses
    }
  },

  render: function () {
    return (
      <div id="hangman" className="middle-row">
        <div className="text">Remaining:</div>
        <div className="big-text">{this.props.remainingGuesses}</div>
      </div>
    );
  }
});

var Alphabet  = React.createClass({

  alphabetSplit: function () {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
    var guessObj = this.props.guessedLetters;
    var word = this.props.word;

    return (
      alphabet.map(function (letter, i) {
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

        return (
          <span className={guessedAlready} key={i}>
            {letter}
          </span>
        );
      })
    );
  },

  render: function () {
    var alphabet = this.alphabetSplit();
    return (
      <div id="alphabet">{alphabet}</div>
    );
  }
});

var GuessBox  = React.createClass({
  getInitialState: function() {
    return {
      letter: ''
    };
  },

  handleChange: function (e) {
    var letter = e.target.value;
    letter = letter.substr(0, 1);
    this.setState({letter: letter});
  },

  clear: function (e) {
    if (e.which === 13) {
      Actions.guessSubmitted(this.state.letter);
    } else {
      this.setState({letter: ''});
    }
  },

  keepFocus: function () {
    ReactDOM.findDOMNode(this.refs.letterinput).focus(); 
  },

  componentDidMount: function () {
    this.keepFocus(); 
  },

  render: function () {
    var letter = this.state.letter;
    return (
      <div id="guessbox" className="middle-row">
        <div className="text">Type a letter and press enter to guess:</div>
        <input 
          onChange={this.handleChange}
          onKeyDown={this.clear}
          onBlur={this.keepFocus}
          value={this.state.letter}
          ref='letterinput'
        />
        <div id="show-letter" className="big-text">
          {letter}
        </div>
      </div>
    );
  }
});

var HiddenWord = React.createClass({
  getInitialState: function () {
    return {
      word: this.props.word,
      guessedLetters: this.props.guessedLetters
    };
  },

  hideWord: function () {
    var wordArray = this.props.word.split('');
    var guessObj = this.props.guessedLetters;

    return (
      wordArray.map(function (letter, i) {
        if (!guessObj.hasOwnProperty(letter)) {
          letter = '_';
        }

        return (
          <span className="letters" key={i}>
            {letter}
          </span>
        );
      })
    );
  },

  render: function () {
    var hiddenword = this.hideWord();
    return (
      <div id="hidden-word">{hiddenword}</div>
    );
  }
});

/*--------------------ResultScreen--------------------------*/
var Results = React.createClass({
  getResultsMsg: function () {
    if (this.props.isWinner) {
      return "You Won!";
    }
    return "You Lost";
  },

  tryAgain: function () {
    Actions.reset();
  },

  render: function () {

    var results = this.getResultsMsg();
    var word = this.props.word;

    return (
      <div>
        <div className="result">{results}</div>
        <div>The word was [{word}]</div>
        <a href="#" onClick={this.tryAgain}>Try Again</a>
      </div>
    );
  }
});
/*--------------------RenderAll--------------------------*/
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

