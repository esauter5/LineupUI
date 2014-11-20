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
        players: {},
        selectedPlayers: selectedPlayers
      };
  },

  render: function () {
    return (
      <div id="lineup-generator">
        <h1>Lineup Generator</h1>
        <div className={"row"}>
          <PlayerTable players={this.props.players} />
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
