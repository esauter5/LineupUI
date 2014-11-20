var Player = React.createClass({
  render: function () {
    var player = this.props.player;
    return (
      <tr>
        <td>{player.position}</td>
        <td>{player.name}</td>
        <td>{player.dollars}</td>
        <td>{player.ppg}</td>
        <td>{player.floor}</td>
        <td>{player.ceiling}</td>
      </tr>
    );
  }
});
