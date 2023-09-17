import Button from "../Components/Button";
import RadioGroup from "../Components/RadioGroup";
import COPY from "../Constants/Copy";

function Home() {
  return (
    <div>
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
      <Button text={COPY.Submit} />
    </div>
  );
}
export default Home;
