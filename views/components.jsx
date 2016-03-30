var React = require("react");
var ReactDOM = require("react-dom");
var Store = require("./store");
var Actions = require("./actions");
var _ = require('underscore');

var App = React.createClass({
  getStoreState: function () {
    return {
      showScreen: Store.getShowScreen(),
      showStartBtn: Store.showStartBtn(),
      word: Store.getWord(),
      wordMax: Store.getWordMax(),
      guessedLetters: Store.getGuessedLetters(),
      remainingGuesses: Store.getRemainingGuesses()
    }
  },
  
  getInitialState: function () {
    return this.getStoreState();
  },

  componentDidMount: function () {
    Store.on('change', this.onChange, this);
  },

  componentWillUnmount: function () {
    activeTasksStore.off('change', this.onChange, this);
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
        return (
          <div id="game-screen">
            
            <Alphabet />
            <Hangman />
            <GuessBox />
            <HiddenWord word={this.state.word}/>
          </div>
        );

      case 'result':
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
    word = word.substr(0, max);

    this.setState({value: word});
    Actions.startWordTyping(word);
  },
  keepFocus: function () {
    ReactDOM.findDOMNode(this.refs.wordinput).focus(); 
  },
  componentDidMount: function () {
    this.keepFocus(); 
  },
  keyUp: function (e) {
    if (e.which === 13) {
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
  render: function () {
    return (
      <div id="hangman">Remaining</div>
    );
  }
});
var Alphabet  = React.createClass({
  render: function () {
    return (
      <div id="alphabet" className="middle-row">abcdefghijklmnopqrstuvwxyz</div>
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
    this.setState({value: letter});
    Actions.guess(letter);
  },
  keyUp: function (e) {
    if (e.which === 13) {
      Actions.guessSumbitted(this.state.letter);
    }
  },
  clear: function () {
    this.setState({value: ''});
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
        <div id="text">Type a letter and press enter to guess:</div>
        <input 
          onChange={this.handleChange}
          onKeyDown={this.clear}
          onKeyUp={this.keyUp}
          onBlur={this.keepFocus}
          value={this.state.value}
          ref='letterinput'
        />
        <div id="show-letter">
          {letter}
        </div>
      </div>
    );
  }
});
var HiddenWord = React.createClass({
  getInitialState: function () {
    return {
      word: this.props.word
    };
  },

  hideWord: function () {
    var wordArray = this.state.word.split('');
    return (
      wordArray.map(function (letter, i) {
        return (
          <span data={i}>
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

/*--------------------RenderAll--------------------------*/
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

