import React from 'react';

const ExpectedIncome = props => {
    return (
        <div>
            <h3>Adjusted Income</h3> 
            Take Home Salary after Taxes: ${props.thousandsSeparator(props.projectedSalary - props.totalTaxAmount)} <br/>
            Monthly Take Home Salary after Taxes: ${props.thousandsSeparator(Math.round((props.projectedSalary - props.totalTaxAmount)/12))} <br/> <br/>
            Take Home Salary sans State Taxes: ${props.thousandsSeparator(Math.round(props.projectedSalary-(props.fedTaxes+ props.FICATax)))} <br/>
            Take Home Monthly Salary sans State Taxes: ${props.thousandsSeparator(Math.round((props.projectedSalary-(props.fedTaxes+ props.FICATax))/12))} <br/> <br/>
            Take Home Salary After ISA and Fed Taxes: ${props.thousandsSeparator(props.projectedSalary - (props.yearlyIsaPayment + props.fedTaxes + props.FICATax))} <br/>
            Monthly Take Home Salary: ${props.thousandsSeparator(Math.round((props.projectedSalary - (props.yearlyIsaPayment + props.fedTaxes + props.FICATax))/12))} <br/>  <br/>
            Take Home Salary After ISA and Taxes: ${props.thousandsSeparator(props.projectedSalary - (props.yearlyIsaPayment + props.totalTaxAmount))} <br/>
            Monthly Take Home Salary: ${props.thousandsSeparator(Math.round((props.projectedSalary - (props.yearlyIsaPayment + props.totalTaxAmount))/12))} <br/> 
        </div>
    );
}

export default ExpectedIncome;