import React from 'react';

const ISATerms = props => {
    return(
        <div>
          <p>
            <h3>ISA Terms </h3> <br/>
            ISA Length: {props.isaTermLength} months <br/>
            ISA Cap: ${props.thousandsSeparator(props.isaCap)} <br/>
            ISA Percentage: {props.isaPercentage * 100}% <br/>
            Minimum salary is ${props.thousandsSeparator(props.minimumSalary)} <br/>
            Projected Yearly Salary: ${props.thousandsSeparator(props.projectedSalary)} / year <br/> 
            Projected Monthly Salary: ${props.thousandsSeparator(Math.ceil(props.projectedSalary/12))} / month <br/>
            <button onClick={() => props.changeTerms()}>Change Terms</button> 
          </p>
        </div>
    );
};

export default ISATerms;