import CardGrid from "../../Cards/CardGrid/CardGrid";
import { colorSequence } from "../../../ColourSequence";
import { useEffect, useState } from "react";
import { getTeams } from "../../../teamClient";
import type TeamModel from "../../../models/TeamModel";

const Home = () => {
  const grids = ["Grid1", "Grid 2", "grid 3"];

  const [teams, setTeams] = useState<TeamModel[]>([]);

  useEffect(() => {
    getTeams()
      .then(setTeams)
      .catch((error) => console.log(error));
  }, []);

  console.log(teams);

  return (
    <>
      {grids.map((_, id) => (
        <CardGrid
          key={id}
          teams={teams}
          backgroundColor={colorSequence[id].background}
          textColor={colorSequence[id].text}
        ></CardGrid>
      ))}
    </>
  );
};

export default Home;
