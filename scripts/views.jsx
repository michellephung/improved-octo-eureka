var App = React.createClass({

	render: function () {
		return (
			<StartPlayingWordInput />
		);
    }

});


var StartPlayingWordInput = React.createClass({
    getInitialState: function () {
 		return null;
    },
    handleClick: function () {
      this.setState(function(state) {
        return {clickCount: state.clickCount + 1};
      });
    },
    render: function () {
		return (
			<input 
				onChange={this.handleChange} 
				placeholder="Type a word" />
		);
    }
 });

ReactDOM.render(
	<App />,
	document.getElementById('app')
);
