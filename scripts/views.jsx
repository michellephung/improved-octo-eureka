var Counter = React.createClass({
    getInitialState: function () {
      return { clickCount: 0 };
    },
    handleClick: function () {
      this.setState(function(state) {
        return {clickCount: state.clickCount + 1};
      });
    },
    render: function () {
		return (
			<div onClick={this.handleClick}>
				Click me! Number of clicks: {this.state.clickCount}
			</div>
		);
    }
 });

ReactDOM.render(
	<Counter />,
	document.getElementById('app')
);
