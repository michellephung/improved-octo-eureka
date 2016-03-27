// var Store = require("store");
// var Dispatcher = require("dispacter");
// var Views = require("views");
// var Actions = require("actions");

requirejs(["store", "action", "dispatcher", "views"], function (Store, Action, Dispatcher, views) {
	var Counter = React.createClass({
		displayName: "Counter",

		getInitialState: function () {
			return { clickCount: 0 };
		},
		handleClick: function () {
			this.setState(function (state) {
				return { clickCount: state.clickCount + 1 };
			});
		},
		render: function () {
			return React.createElement(
				"div",
				{ onClick: this.handleClick },
				"Click me! Number of clicks: ",
				this.state.clickCount
			);
		}
	});

	ReactDOM.render(React.createElement(Counter, null), document.getElementById('app'));
});