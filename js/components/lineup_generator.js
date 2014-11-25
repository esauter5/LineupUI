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
        autocompletePlayers: [],
        excludedPlayers: [],
        excludeString: "",
        risk: "ppg"
      };
  },

  handleGenerateClick: function() {
    var excludedPlayers = this.state.excludedPlayers;
    var risk = this.state.risk;
    var includedPlayers = this.state.selectedPlayers.filter(function (p) {
      return p.name != "";
    })
      .map(function (p) {
        return p.name;
      });

    $.ajax({
      url: "http://203e44e2.ngrok.com/lineup",
      type: "POST",
      data: {
        risk: risk,
        include: includedPlayers,
        exclude: excludedPlayers
      }
    })
    .done(function (data) {
      var count;
      var selectedPlayers = this.state.selectedPlayers;
      data.forEach(function (d) {
        for (count = 0; count < selectedPlayers.length; count++) {
          if (selectedPlayers[count].position === d.player.position && selectedPlayers[count].name === "") {
            //players[i].selected = true;
            selectedPlayers[count].name = d.player.name;
            break;
          }
        }
      });
      this.setState({selectedPlayers: selectedPlayers});
    }.bind(this));
  },

  handleAutocompleteChange: function (e) {
    var autocompletePlayers = [];

    if (e.target.value != "") {
      this.state.players.forEach(function (p) {
        if (p.name.indexOf(e.target.value) != -1) {
          autocompletePlayers.push(p);
        }
      });
    }
    this.setState({ autocompletePlayers: autocompletePlayers, excludeString: e.target.value });
  },

  handleExcludeClick: function (e) {
    var excludedPlayers = this.state.excludedPlayers;
    if ( excludedPlayers.indexOf(e.target.textContent) == -1 ) {
      excludedPlayers.push(e.target.textContent);
    }

    this.setState({excludedPlayers: excludedPlayers, autocompletePlayers: [], excludeString: ""});
  },

  handleExcludedRemove: function (e) {
    var excludedPlayers = this.state.excludedPlayers.filter( function(p) {
      return p != e.target.parentNode.textContent;
    });

    this.setState({excludedPlayers: excludedPlayers});
  },

  handleXClick: function (i) {
    var selectedPlayers = this.state.selectedPlayers;
    var players = this.state.players;

    for (count = 0; count < selectedPlayers.length; count++) {
      if (selectedPlayers[i].name === players[count].name) {
        players[count].selected = false;
        break;
      }
    }

    selectedPlayers[i].name = "";
    this.setState({selectedPlayers: selectedPlayers, players: players})
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

  handleRiskChange: function (e) {
    this.setState({risk: e.target.value});
  },

  componentDidMount: function () {
    $.get("http://203e44e2.ngrok.com/players", function(data) {
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
            <GenerateButton onGenerateClick={this.handleGenerateClick} />
            <RiskSelector risk={this.state.risk} riskChange={this.handleRiskChange} />
            <Autocomplete excludeClick={this.handleExcludeClick} excludeString={this.state.excludeString} autocompleteChange={this.handleAutocompleteChange} autocompletePlayers={this.state.autocompletePlayers}/>
            <ExcludedPlayers removeFromExcluded={this.handleExcludedRemove} excluded={this.state.excludedPlayers} />
        </div>
        </div>
      </div>
    );
  }
});
