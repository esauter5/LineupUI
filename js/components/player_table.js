var PlayerTable = React.createClass({
  render: function () {
    var playerList = this.props.players.map(function (player) {
      return (
        <Player player={player} key={player.index} handleClick={this.props.onPlayerClick.bind(null, player.index)} />
      );
    }.bind(this));

    return (
      <div className={"col-md-8"}>
      <table id="player-table" className={"table"}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Salary</th>
            <th>PPG</th>
            <th>Floor</th>
            <th>Ceiling</th>
          </tr>
        </thead>
        <tbody>
        {playerList}
        </tbody>
      </table>
      </div>
    );
  }
});
