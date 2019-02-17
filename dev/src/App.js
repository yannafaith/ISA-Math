import React, { Component } from 'react';
import ISATerms from './components/ISATerms';
import ExpectedIncome from './components/ExpectedIncome';
import TaxesInfo from './components/TaxesInfo';


class App extends Component {
  state = {
    minimumSalary: 50000,
    isaCap: 40000,
    isaPercentage: .17, // in decimal form
    isaTermLength: 36, // in months
    projectedSalary: 95000
  };

  changeTerms = () => {
    let projSalary = prompt('What is your expected salary?');
    if (projSalary == null) {
      projSalary = this.state.minimumSalary
    }
    this.setState({
      projectedSalary: projSalary,
    });
  };

  thousandsSeparator(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };


  render() {


  let yearlyPayment = Math.ceil((this.state.projectedSalary || this.state.minimumSalary) * this.state.isaPercentage);


    return (
      <div className="App">
        <h2>Income Calculations</h2>
        <ISATerms 
          isaTermLength={this.state.isaTermLength} 
          thousandsSeparator={this.thousandsSeparator}
          isaCap={this.state.isaCap}
          isaPercentage={this.state.isaPercentage}
          minimumSalary={this.state.minimumSalary}
          projectedSalary={this.state.projectedSalary}
          changeTerms={this.changeTerms}
        />
        <ExpectedIncome
          isaTermLength={this.state.isaTermLength} 
          thousandsSeparator={this.thousandsSeparator}
          isaCap={this.state.isaCap}
          isaPercentage={this.state.isaPercentage}
          minimumSalary={this.state.minimumSalary}
          projectedSalary={this.state.projectedSalary}
          yearlyIsaPayment={yearlyPayment}
        />
        <TaxesInfo 
          projectedSalary={this.state.projectedSalary}
          thousandsSeparator={this.thousandsSeparator}
          yearlyIsaPayment={yearlyPayment}
        />
      </div>
    );
  };
};

export default App;

/* imports already available: 

-- axios 
-- react-dom 
-- react-router-dom for { Route, BrowserRouter, Link } 
-- styled-components for styled



*/