var SelectedPlayers = React.createClass({
  render: function () {
    var selectedPlayers = this.props.selectedPlayers.map(function (player, i) {
        return (
          <li className={"list-group-item"} key={i}>
            <span className={"selected-position"}>{player.position}</span>
            <span>{player.name}</span>
            <span className={"glyphicon glyphicon-remove-sign pull-right"}></span>
          </li>
        )
    })
    return (
      <ul id="selected-players">
        {selectedPlayers}
      </ul>
    );
  }
});
