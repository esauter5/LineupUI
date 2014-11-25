var ExcludedPlayers = React.createClass({
  render: function () {
    var excluded = this.props.excluded.map(function (p) {
      return (
        <li>
          {p}
          <span onClick={this.props.removeFromExcluded} className={"glyphicon glyphicon-remove-sign"} />
        </li>
      );
    }.bind(this));

    return (
      <div id="excluded-selected">
      <ul>
        {excluded}
      </ul>
      </div>
    );
  }
});
