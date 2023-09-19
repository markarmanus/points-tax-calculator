import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import { TaxBracket } from "../../Interfaces/Taxes";
import { AllTaxesOwed, BracketOwedTaxes, calculateTaxes } from "../../Utils/TaxMath";
import LabeledInfo from "../../Components/LabeledInfo";
import COPY from "../../Constants/Copy";

interface TaxCalculationResultProps {
  taxBrackets?: TaxBracket[];
  income?: number;
}
const ResultsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const formatNumber = (num?: number) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "CAD" }).format(num || 0);
};
const TaxCalculationResult = memo(function TaxCalculationResult(props: TaxCalculationResultProps) {
  const { taxBrackets, income } = props;
  const [taxCalculation, setTaxCalculation] = useState<AllTaxesOwed>();
  useEffect(() => {
    if (income && taxBrackets) setTaxCalculation(calculateTaxes(income, taxBrackets));
  }, [taxBrackets, income]);

  console.log(income, taxBrackets);
  return (
    <ResultsContainer>
      {taxCalculation && (
        <>
          {taxCalculation.taxesByBracket.map((owedPerBracket: BracketOwedTaxes, index: number) => {
            return <LabeledInfo key={index} label={owedPerBracket.label} info={formatNumber(owedPerBracket.owed)} />;
          })}
          <LabeledInfo label={COPY.TotalTaxes} info={formatNumber(taxCalculation.total)} />
          <LabeledInfo label={COPY.NetIncome} info={formatNumber(taxCalculation.afterTaxIncome)} />
          <LabeledInfo label={COPY.EffectiveTaxRate} info={taxCalculation.effectiveRate.toString()} />
        </>
      )}
    </ResultsContainer>
  );
});

export default TaxCalculationResult;
