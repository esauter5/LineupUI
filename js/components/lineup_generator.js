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
        selectedPlayers: selectedPlayers,
        excludedPlayers: []
      };
  },

  handleExcludeChange: function (e) {
    var excludedPlayers = [];

    if (e.target.value != "") {
      this.state.players.forEach(function (p) {
        if (p.name.indexOf(e.target.value) != -1) {
          excludedPlayers.push(p);
        }
      });
    }
    this.setState({ excludedPlayers: excludedPlayers });
  },

  handleXClick: function (i) {
    var selectedPlayers = this.state.selectedPlayers;
    selectedPlayers[i].name = "";
    this.setState({selectedPlayers: selectedPlayers})
  },

  handlePlayerClick: function (i) {
    var count;
    var players = this.state.players;
    var selectedPlayers = this.state.selectedPlayers;
    for (count = 0; count < selectedPlayers.length; count++) {
      if (selectedPlayers[count].position === players[i].position && selectedPlayers[count].name === "") {
        players[i].selected = true;
        selectedPlayers[count].name = players[i].name;
        break;
      }
    }
    console.log(selectedPlayers)
    this.setState({players: players, selectedPlayers: selectedPlayers});
  },

  handleClear: function () {
    var selectedPlayers = this.state.selectedPlayers.map(function (p) {
      p.name = "";
      return p;
    });

    this.setState({selectedPlayers: selectedPlayers})
  },

  componentDidMount: function () {
    $.get("http://localhost:3000/players", function(data) {
      var players = data.map(function (d,i) {
        d.player.selected = false;
        d.player.index = i;
        return d.player;
      });
      this.setState({players: players})
    }.bind(this));
  },

  render: function () {
    var availablePlayers = this.state.players.filter(function (player) {
      return player.selected == false;
    })

    return (
      <div id="lineup-generator">
        <h1>Lineup Generator</h1>
        <div className={"row"}>
          <PlayerTable players={availablePlayers} onPlayerClick={this.handlePlayerClick}/>
          <div className={"col-md-4"}>
            <SelectedPlayers onXClick={this.handleXClick} selectedPlayers={this.state.selectedPlayers} />
            <ClearButton onClear={this.handleClear} />
            <GenerateButton />
            <Autocomplete excludeChange={this.handleExcludeChange} excludedPlayers={this.state.excludedPlayers}/>
          </div>
        </div>
      </div>
    );
  }
});
