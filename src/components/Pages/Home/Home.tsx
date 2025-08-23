import CardGrid from "../../Cards/CardGrid/CardGrid";
import { colorSequence } from "../../../ColourSequence";

const Home = () => {
  const grids = ["Grid1", "Grid 2", "grid 3"];

  return (
    <>
      {grids.map((_, id) => (
        <CardGrid
          key={id}
          titles={["gwe", "fddfsfds"]}
          backgroundColor={colorSequence[id].background}
          textColor={colorSequence[id].text}
        ></CardGrid>
      ))}
    </>
  );
};

export default Home;
