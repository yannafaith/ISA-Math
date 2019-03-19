import React, { Component } from 'react';
import {ISATerms} from './components/ISATerms';
import ExpectedIncome from './components/ExpectedIncome';
import TaxesInfo from './components/TaxesInfo';
import styled from 'styled-components';
import ISAPayback from './components/ISAPayback';
import Taxee from 'taxee-tax-statistics';
import './App.css';

const SContainer = styled.div`{
  display: flex;
  justify-content: space-evenly;
  border: solid blue 2px;
}`;

 const SHeaderCenter = styled.h2`{
   display: flex;
   justify-content: center;
   border: solid green 2px;
 }`;


class App extends Component {
  state = {
    minimumSalary: 50000,
    isaCap: 40000,
    isaPercentage: .17, // in decimal form
    isaTermLength: 36, // in months
    projectedSalary: 95000,
    currentState: null
  };

  changeTerms = () => {
    let projSalary = prompt('What is your expected salary?');
    let newState = prompt('What state are you in?');
    let newPerc = prompt('What is your ISA payback percentage?');
    let newCap = prompt('What is your ISA Cap?');
    let newTermLen = prompt('What is your ISA term length?');
    this.setState({
      projectedSalary: projSalary || this.state.minimumSalary,
      currentState: newState || 'arizona',
    });
    newCap && this.setState({isaCap: newCap});
    newPerc && this.setState({isaPercentage: newPerc});
    newTermLen && this.setState({isaTermLength: newTermLen})
  };

  thousandsSeparator(num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };


  render() {


  let yearlyPayment = Math.ceil((this.state.projectedSalary || this.state.minimumSalary) * this.state.isaPercentage);

  const state = this.state.currentState || 'arizona';
  const maritalStatus = 'single';

  const FICARate = 7.65;

  const stateTaxBrackets = Taxee[2019][state][maritalStatus].income_tax_brackets;

  const fedTaxBrackets = Taxee[2019].federal.tax_withholding_percentage_method_tables.annual.single.income_tax_brackets;

  const deductions = {
    state: Taxee[2019][state][maritalStatus].deductions[0].deduction_amount,
    federal: Taxee[2019].federal.tax_withholding_percentage_method_tables.annual.single.deductions[0].deduction_amount
  };

  const stateTaxes1 = (stateTaxBrackets[1].bracket * (stateTaxBrackets[0].marginal_rate / 100))

  const stateTaxes2 = ((stateTaxBrackets[2].bracket - stateTaxBrackets[1].bracket)  * (stateTaxBrackets[1].marginal_rate / 100))

  const stateTaxes3 = ((stateTaxBrackets[3].bracket - stateTaxBrackets[2].bracket)  * (stateTaxBrackets[2].marginal_rate / 100))

  // need to make the calculation based on projSalary. Right now the taxes for > 95k are wrong because tax brackets higher than needed are calculated


  const stateTaxes4 = (((this.state.projectedSalary - deductions.state) - stateTaxBrackets[3].bracket)  *(stateTaxBrackets[3].marginal_rate / 100))

  const stateTaxes = Math.ceil(stateTaxes1 + stateTaxes2+ stateTaxes3 + stateTaxes4)

  // Federal Marginal Tax Amounts

  const fedTaxes1 = (fedTaxBrackets[1].bracket * (fedTaxBrackets[0].marginal_rate / 100))

  const fedTaxes2 = ((fedTaxBrackets[2].bracket - fedTaxBrackets[1].bracket)  * (fedTaxBrackets[1].marginal_rate / 100))

  const fedTaxes3 = ((fedTaxBrackets[3].bracket - fedTaxBrackets[2].bracket)  * (fedTaxBrackets[2].marginal_rate / 100))

  // need to make the calculation based on projSalary. Right now the taxes for > 95k are wrong because tax brackets higher than needed are calculated

  const fedTaxes4 = (((this.state.projectedSalary - deductions.federal) - fedTaxBrackets[3].bracket) * (fedTaxBrackets[3].marginal_rate / 100))

  const fedTaxes = Math.ceil(fedTaxes1 + fedTaxes2+ fedTaxes3 + fedTaxes4)

  // FICA tax

  const FICATax = this.state.projectedSalary * (FICARate/100);
  const totalTaxAmount = stateTaxes + fedTaxes + FICATax

  // const effectiveStateTaxRate = (stateTaxes / this.state.projectedSalary) * 100
  // const effectiveFedTaxRate = (fedTaxes / this.state.projectedSalary) * 100

  // const roundedState = Math.round((effectiveStateTaxRate * 100 ))/100;
  //  const roundedFed = Math.round((effectiveFedTaxRate * 100 ))/100;

    return (
      <div>
        <SHeaderCenter>Income Calculations</SHeaderCenter>
        <SContainer>
          <ISATerms 
            isaTermLength={this.state.isaTermLength} 
            thousandsSeparator={this.thousandsSeparator}
            isaCap={this.state.isaCap}
            isaPercentage={this.state.isaPercentage}
            minimumSalary={this.state.minimumSalary}
            projectedSalary={this.state.projectedSalary}
            changeTerms={this.changeTerms}
          />
          <ISAPayback
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
            state={this.state.currentState}
          />
          <ExpectedIncome
            thousandsSeparator={this.thousandsSeparator}
            projectedSalary={this.state.projectedSalary}
            yearlyIsaPayment={yearlyPayment}
            totalTaxAmount={totalTaxAmount}
            fedTaxes={fedTaxes}
            FICATax={FICATax}
//
          />
        </SContainer>
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