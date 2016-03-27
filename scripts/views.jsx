requirejs([
  "../build/store",
  "../build/actions",
  "../build/dispatcher"
],
function(Store, Actions, Dispatcher) {

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
      Actions.startWordTyping();
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

        return null;
    }
  });

  ReactDOM.render(
    <App />,
    document.getElementById('html-hook')
  );

});
