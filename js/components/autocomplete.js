var Autocomplete = React.createClass({
  render: function () {
    var results = this.props.autocompletePlayers.map(function (r) {
      return (
        <li onClick={this.props.excludeClick}>{r.name}</li>
      )
    }.bind(this));

    var hide = this.props.autocompletePlayers.length > 0 ? "" : "hide-item"

    return (
      <div id="excluded-autocomplete">
        <p>Excluded Players:</p>
        <input value={this.props.excludeString} ref="autocompleteInput" type="text" onChange={this.props.autocompleteChange} />
        <ul className={hide}>
          {results}
        </ul>
      </div>
    );
  }
});
