import { useCallback, useEffect, useState } from "react";
import Button from "../../Components/Button";
import toast from "react-hot-toast";
import LabeledInput from "../../Components/LabeledInput";
import RadioGroup from "../../Components/RadioGroup";
import COPY from "../../Constants/Copy";
import { styled } from "styled-components";
import { TaxBracket } from "../../Interfaces/Taxes";
import TaxCalculationResult from "./TaxCalculationResult";
import BeatLoader from "react-spinners/BeatLoader";
import API from "../../Utils/API";
import COLORS from "../../Constants/Colors";

const yearOptions = [
  { text: "2019", value: "2019" },
  { text: "2020", value: "2020" },
  { text: "2021", value: "2021" },
];
const Container = styled.div`
  width: 100%;
`;

const ResultsContainer = styled.div`
  margin-top: 20px;
`;

function Home() {
  const [year, setYear] = useState<string>();
  const [income, setIncome] = useState<number>();
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>();

  useEffect(() => {
    if (year && income && income > 0) setCanSubmit(true);
    else setCanSubmit(false);
  }, [year, income]);

  const updateIncome = useCallback((income: string) => {
    setIncome(Number(income));
  }, []);

  const updateYear = useCallback((year: string) => {
    setYear(year);
    setTaxBrackets(undefined);
  }, []);

  const showResults = useCallback(() => {
    return income && income > 0 && taxBrackets && year;
  }, [income, year, taxBrackets]);

  const onSubmit = useCallback(async () => {
    if (year !== undefined) {
      setLoading(true);
      try {
        const bracketsData = await API.getTaxBracketData(year);
        setTaxBrackets(bracketsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setTaxBrackets(undefined);
        toast.error("Failed to Fetch Tax Data, Please Try again!", { duration: 2000 });
      }
    }
  }, [year]);

  return (
    <Container>
      <h2>Tax Calculator</h2>
      <RadioGroup groupLabel={COPY.TaxYear} options={yearOptions} onChange={updateYear} />
      <LabeledInput
        type="number"
        validator={(value) => Number(value) > 0}
        errorMessage="Income must be greater than 0"
        label="Yearly Income In CAD"
        onChange={updateIncome}
      />
      <Button disabled={!canSubmit} onClick={onSubmit} text={COPY.Submit} />
      <ResultsContainer>
        {loading ? (
          <BeatLoader loading={true} color={COLORS.highlight} />
        ) : showResults() ? (
          <TaxCalculationResult taxBrackets={taxBrackets} income={income} />
        ) : null}
      </ResultsContainer>
    </Container>
  );
}
export default Home;
