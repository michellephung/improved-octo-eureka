requirejs([
  "store",
  "action",
  "dispatcher"
],
function(Store, Action, Dispatcher) {
  
  var App = React.createClass({
    render: function () {
      return (
        <StartPlayingWordInput />
        <StartBtn />
      );
    }

  });


  var StartPlayingWordInput = React.createClass({
    handleChange: function () {
      Action.startWordTyping();
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
    }

    handleClick: function () {
      console.log("click");
    },

    render: function () {
        var startBtn;

        if (this.props.showStartBtn) {
          startBtn = this.startBtn();
        }

        return (
          <input 
            onClick={this.handleClick} 
            placeholder="Start" />
          {startBtn}
        );
    )}
  });

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );

});
