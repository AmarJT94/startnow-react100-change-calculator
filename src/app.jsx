import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Pennies: 0,
      Nickels: 0,
      Dimes: 0,
      Quarters: 0,
      Dollars: 0,
      Fives: 0,
      Tens: 0,
      Twenties: 0,
      change: 0,
      cashDue: "",
      cashReceived: ""
    };
    this.handleCashDue = this.handleCashDue.bind(this);
    this.changeCalc = this.changeCalc.bind(this);
  }

  handleCashDue(event) {
    console.log(event.target.value);
    this.setState({ cashDue: event.target.value });
  }

  handleCashReceived(event) {
    console.log(event.target.value);
    this.setState({ cashReceived: event.target.value });
  }

  changeCalc(amountNeeded, amountGiven) {
    var amountDue = parseFloat(amountNeeded);
    var amountReceived = parseFloat(amountGiven);
    console.log(amountDue, " ", amountReceived)
    var sortedChange = {
      Twenties: 0,
      Tens: 0,
      Fives: 0,
      Dollars: 0,
      Quarters: 0,
      Dimes: 0,
      Nickels: 0,
      Pennies: 0,
      change: 0
    };

    var calculatedChange = amountReceived - amountDue;
    sortedChange.change = calculatedChange;
    // Determines how many of each denomination is required
    if (calculatedChange.toFixed(2) / 20 >= 1) {
      sortedChange.Twenties = Math.floor(calculatedChange / 20);
      calculatedChange = calculatedChange - sortedChange.Twenties * 20;
    }

    if (calculatedChange.toFixed(2) / 10 >= 1) {
      sortedChange.Tens = Math.floor(calculatedChange / 10);
      calculatedChange = calculatedChange - sortedChange.Tens * 10;
    }

    if (calculatedChange.toFixed(2) / 5 >= 1) {
      sortedChange.Fives = Math.floor(calculatedChange / 5);
      calculatedChange = calculatedChange - sortedChange.Fives * 5;
    }

    if (calculatedChange.toFixed(2) / 1 >= 1) {
      sortedChange.Dollars = Math.floor(calculatedChange / 1);
      calculatedChange = calculatedChange - sortedChange.Dollars;
    }

    if (calculatedChange.toFixed(2) / 0.25 >= 0.25) {
      sortedChange.Quarters = Math.floor(calculatedChange / 0.25);
      calculatedChange = calculatedChange - sortedChange.Quarters * 0.25;
    }

    if (calculatedChange.toFixed(2) / 0.1 >= 0.1) {
      sortedChange.Dimes = Math.floor(calculatedChange / 0.1);
      calculatedChange = calculatedChange - sortedChange.Dimes * 0.1;
    }

    if (calculatedChange.toFixed(2) / 0.05 >= 0.05) {
      sortedChange.Nickels = Math.floor(calculatedChange / 0.05);
      calculatedChange = calculatedChange - sortedChange.Nickels * 0.05;
    }

    if (calculatedChange.toFixed(2) / 0.01 >= 0.01) {
      sortedChange.Pennies = Math.floor(calculatedChange.toFixed(2) / 0.01);
      calculatedChange = calculatedChange - sortedChange.Pennies * 0.01;
    }

    console.log(sortedChange)

    this.setState(sortedChange)

  }

  renderChangePannels() {
    const change = [
      { name: "Pennies", changeValue: this.state.Pennies },
      { name: "Nickels", changeValue: this.state.Nickels },
      { name: "Dimes", changeValue: this.state.Dimes },
      { name: "Quarters", changeValue: this.state.Quarters },
      { name: "Dollars", changeValue: this.state.Dollars },
      { name: "Fives", changeValue: this.state.Fives },
      { name: "Tens", changeValue: this.state.Tens },
      { name: "Twenties", changeValue: this.state.Twenties }
    ];
    return change.map(item => {
      return (
        <div className="col-xs-3 panel panel-default">
          <h4 className="text-center textBold">{item.name}</h4>
          <h4 className="text-center">{item.changeValue}</h4>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="page-header">
            <h1 className="textWhite">Change Calculator</h1>
          </div>
        </header>
        <div className="row shiftLeftRow">
          {/* Inputs panel */}
          <div className="panel panel-default col-xs-4 mainPanels infoPanel">
            <div className="panel-heading">Enter Information</div>
            <div className="panel-body">
              <h5 className="textBold">How much is due?</h5>
              <input
                placeholder="Amount Due"
                value={this.state.cashDue}
                onChange={event => this.handleCashDue(event)}
              />
              <h5 className="textBold">How much was received</h5>
              <input
                placeholder="Amount Received"
                value={this.state.cashReceived}
                onChange={event => this.handleCashReceived(event)}
              />
            </div>
            <div className="panel-footer text-center">
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={() => this.changeCalc(this.state.cashDue, this.state.cashReceived)}
              >
                Calculate
              </button>
            </div>
          </div>
          {/* Denominator Panel */}
          <div className="panel panel-default col-xs-8 mainPanels changePanel">
            <div className="col-xs-12 panel panel-success text-center">
              <h3 className="textGreen">{`Total change due ${this.state.change}`}</h3>
            </div>
            <div className="panel-body">
              <div className="row">{this.renderChangePannels()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
