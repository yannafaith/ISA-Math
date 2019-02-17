import React from 'react';

const ExpectedIncome = props => {

    let yearlyPayment = Math.ceil((props.projectedSalary || props.minimumSalary) * props.isaPercentage);
    let monthlyPayment = Math.ceil(yearlyPayment / 12);
    let totalPayment = monthlyPayment * props.isaTermLength;

    if (totalPayment > props.isaCap) {
      totalPayment = props.isaCap
    };

    let paymentMonths = Math.ceil(props.isaCap / monthlyPayment)

    return (
        <div>
            <h3>ISA Payback Info</h3> <br/>
            Yearly Payment: ${props.thousandsSeparator(yearlyPayment)} <br/>
            Monthly Payment: ${props.thousandsSeparator(monthlyPayment)} <br/>
            Total Payment: ${props.thousandsSeparator(totalPayment)} <br/>
            Months of Payment: { totalPayment === props.isaCap ? paymentMonths : props.isaTermLength}
      </div>
    );
};

export default ExpectedIncome;