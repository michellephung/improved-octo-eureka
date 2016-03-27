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
	handleChange: function () {
		this.setState(function (state) {
			console.log("b");
			return { showStartBtn: true };
		});
	},
	render: function () {
		return React.createElement("input", {
			onChange: this.handleChange,
			placeholder: "Type a word" });
	}
});

var StartBtn = React.createClass({
	displayName: "StartBtn",

	handleClick: function () {
		console.log("click");
	},

	render: function () {
		return React.createElement("input", {
			onClick: this.handleClick,
			placeholder: "Start" });
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));