var GenerateButton = React.createClass({
  render: function () {
    return (
      <button onClick={this.props.onGenerateClick} id="generate-lineup" className={"btn btn-primary"}>
        Generate Lineup
      </button>
    )
  }
})
