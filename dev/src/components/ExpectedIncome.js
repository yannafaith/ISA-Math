import React from 'react';
import {SContainer} from './ISATerms'

const ExpectedIncome = props => {
    return (
        <SContainer>
            <h3>Adjusted Income</h3> 
            Take Home Salary after Taxes: <br/> Yearly: ${props.thousandsSeparator(props.projectedSalary - props.totalTaxAmount)} | Monthly: ${props.thousandsSeparator(Math.round((props.projectedSalary - props.totalTaxAmount)/12))} <br/> <br/>
            Take Home Salary sans State Taxes: <br/> Yearly: ${props.thousandsSeparator(Math.round(props.projectedSalary-(props.fedTaxes+ props.FICATax)))} Monthly:  ${props.thousandsSeparator(Math.round((props.projectedSalary-(props.fedTaxes+ props.FICATax))/12))} <br/> <br/>
            Take Home Salary After ISA + Fed Taxes: <br/> Yearly: ${props.thousandsSeparator(props.projectedSalary - (props.yearlyIsaPayment + props.fedTaxes + props.FICATax))} | Monthly: ${props.thousandsSeparator(Math.round((props.projectedSalary - (props.yearlyIsaPayment + props.fedTaxes + props.FICATax))/12))} <br/> <br/>
            Take Home Salary After ISA + Taxes: <br/> Yearly: ${props.thousandsSeparator(props.projectedSalary - (props.yearlyIsaPayment + props.totalTaxAmount))} | Monthly: ${props.thousandsSeparator(Math.round((props.projectedSalary - (props.yearlyIsaPayment + props.totalTaxAmount))/12))} <br/> <br/> 
        </SContainer>
    );
}

export default ExpectedIncome;