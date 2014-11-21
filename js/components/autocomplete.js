var Autocomplete = React.createClass({
  render: function () {
    var results = this.props.excludedPlayers.map(function (r) {
      return (
        <li>{r.name}</li>
      )
    });

    return (
      <div id="exclude-players">
        <p>Exclude Players:</p>
        <input type="text" onChange={this.props.excludeChange} />
        <ul>
          {results}
        </ul>
      </div>
    );
  }
});
