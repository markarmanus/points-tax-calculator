import Button from "../Components/Button";
import COPY from "../Constants/Copy";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Button text={COPY.Submit} />
    </div>
  );
}
export default Home;
