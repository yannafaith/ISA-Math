import React from 'react';
import {SContainer} from './ISATerms'

const ISAPayback = props => {

    let monthlyPayment = Math.ceil(props.yearlyIsaPayment / 12);
    let totalPayment = monthlyPayment * props.isaTermLength;

    if (totalPayment > props.isaCap) {
      totalPayment = props.isaCap
    };

    let paymentMonths = Math.ceil(props.isaCap / monthlyPayment)

    return (
        <SContainer>
            <h3>ISA Payback Info</h3>
            Yearly Payment: ${props.thousandsSeparator(props.yearlyIsaPayment)} <br/>
            Monthly Payment: ${props.thousandsSeparator(monthlyPayment)} <br/>
            Total Payment: ${props.thousandsSeparator(totalPayment)} <br/>
            Months of Payment: { totalPayment === props.isaCap ? paymentMonths : props.isaTermLength}
      </SContainer>
    );
};

export default ISAPayback;