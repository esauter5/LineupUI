var ClearButton = React.createClass({
  render: function () {
    return (
      <button id="clear-lineup" className={"btn btn-danger"} onClick={this.props.onClear}>
        Clear Lineup
      </button>
    );
  }
});
