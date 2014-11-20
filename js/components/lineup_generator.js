var LineupGenerator = React.createClass({
  getInitialState: function () {
      var selectedPlayers = [
        {name: "", position: "PG"},
        {name: "", position: "PG"},
        {name: "", position: "SG"},
        {name: "", position: "SG"},
        {name: "", position: "SF"},
        {name: "", position: "SF"},
        {name: "", position: "PF"},
        {name: "", position: "PF"},
        {name: "", position: "C"}
      ];

      return {
        players: [],
        selectedPlayers: selectedPlayers
      };
  },

  componentDidMount: function () {
    $.get("http://localhost:3000/players", function(data) {
      var players = data.map(function (d) {
        return d.player;
      });
      debugger;
      this.setState({players: players})
    }.bind(this));
  },

  render: function () {
    return (
      <div id="lineup-generator">
        <h1>Lineup Generator</h1>
        <div className={"row"}>
          <PlayerTable players={this.state.players} />
          <div className={"col-md-4"}>
            <SelectedPlayers selectedPlayers={this.state.selectedPlayers} />
            <ClearButton />
            <GenerateButton />
          </div>
        </div>
      </div>
    );
  }
});
