import Button from "../Components/Button";
import LabeledInfo from "../Components/LabeledInfo";
import LabeledInput from "../Components/LabeledInput";
import RadioGroup from "../Components/RadioGroup";
import COPY from "../Constants/Copy";

function Home() {
  return (
    <div style={{ width: "100%" }}>
      <h2>Tax Calculator</h2>
      <RadioGroup
        groupLabel={COPY.TaxYear}
        onChange={(item) => {
          console.log(item);
        }}
        options={[
          { text: "2019", value: "1" },
          { text: "2020", value: "2" },
          { text: "2021", value: "3" },
        ]}
      />
      <LabeledInput
        type="number"
        placeholder="$"
        validator={(value) => Number(value) < 100}
        errorMessage="Please enter a number less than 100"
        label="Yearly Income ($)"
        onChange={console.log}
      />
      <Button text={COPY.Submit} />
      <LabeledInfo label="Bracket of 100 to 20000" info="$434343" />
      <LabeledInfo label="Bracket of 100 to 20000" info="$434343" />
      <LabeledInfo label="Bracket of 100 to 20000" info="$434343" />
      <LabeledInfo label="Bracket of 100 to 20000" info="$434343" />
      <LabeledInfo label="Bracket of 100 to 20000" info="$434343" />
    </div>
  );
}
export default Home;
