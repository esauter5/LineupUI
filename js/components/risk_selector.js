var RiskSelector = React.createClass({
  render: function () {
    return (
      <div id="risk-type">
        Algorithm:
        <select value={this.props.risk} onChange={this.props.riskChange}>
          <option value="floor">Floor</option>
          <option value="ppg">PPG</option>
          <option value="ceiling">Ceiling</option>
        </select>
      </div>
    );
  }
});
