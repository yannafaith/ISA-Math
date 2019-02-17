import React from 'react';
import Taxee from 'taxee-tax-statistics';

const state = 'arizona';
const maritalStatus = 'single';

const FICARate = 7.65;

const stateTaxBrackets = Taxee[2019][state][maritalStatus].income_tax_brackets;

const fedTaxBrackets = Taxee[2019].federal.tax_withholding_percentage_method_tables.annual.single.income_tax_brackets;

const deductions = {
    state: Taxee[2019][state][maritalStatus].deductions[0].deduction_amount,
    federal: Taxee[2019].federal.tax_withholding_percentage_method_tables.annual.single.deductions[0].deduction_amount
};


const TaxesInfo = props => {

    // State Marginal Tax Amounts

    const stateTaxes1 = (stateTaxBrackets[1].bracket * (stateTaxBrackets[0].marginal_rate / 100))

    const stateTaxes2 = ((stateTaxBrackets[2].bracket - stateTaxBrackets[1].bracket)  * (stateTaxBrackets[1].marginal_rate / 100))

    const stateTaxes3 = ((stateTaxBrackets[3].bracket - stateTaxBrackets[2].bracket)  * (stateTaxBrackets[2].marginal_rate / 100))

    // need to make the calculation based on projSalary. Right now the taxes for 50k are wrong because a tax bracket higher than needed is calculated

    const stateTaxes4 = (((props.projectedSalary - deductions.state) - stateTaxBrackets[3].bracket)  *(stateTaxBrackets[3].marginal_rate / 100))

    const stateTaxes = Math.ceil(stateTaxes1 + stateTaxes2+ stateTaxes3 + stateTaxes4)

    // Federal Marginal Tax Amounts

    const fedTaxes1 = (fedTaxBrackets[1].bracket * (fedTaxBrackets[0].marginal_rate / 100))

    const fedTaxes2 = ((fedTaxBrackets[2].bracket - fedTaxBrackets[1].bracket)  * (fedTaxBrackets[1].marginal_rate / 100))

    const fedTaxes3 = ((fedTaxBrackets[3].bracket - fedTaxBrackets[2].bracket)  * (fedTaxBrackets[2].marginal_rate / 100))

    // need to make the calculation based on projSalary. Right now the taxes for 50k are wrong because a tax bracket higher than needed is calculated

    const fedTaxes4 = (((props.projectedSalary - deductions.federal) - fedTaxBrackets[3].bracket) * (fedTaxBrackets[3].marginal_rate / 100))

    const fedTaxes = Math.ceil(fedTaxes1 + fedTaxes2+ fedTaxes3 + fedTaxes4)

    // FICA tax

    const FICATax = props.projectedSalary * (FICARate/100);
    const totalTaxAmount = stateTaxes + fedTaxes + FICATax

    return (
        <div>
            <h3>Taxes Info</h3>
            State Taxes Amount: ${props.thousandsSeparator(stateTaxes)} <br/>
            Federal Taxes Amount: ${props.thousandsSeparator(fedTaxes)} <br/>
            FICA Tax Amount: ${props.thousandsSeparator(FICATax)} <br/>
            Total Taxes Amount: ${props.thousandsSeparator(totalTaxAmount)} <br/>
            Effective State Tax Rate: {(stateTaxes / props.projectedSalary) * 100} <br/>
            Effective Federal Tax Rate: {(fedTaxes / props.projectedSalary) * 100} <br/>
            {/* Need to refactor to make below dynamic */}
            Take Home Salary After ISA and Taxes: {props.projectedSalary - (20400 + totalTaxAmount)}


        </div>
    );
};

export default TaxesInfo;