import { useParams } from "react-router";
import { getRetros } from "../../../retroClient";
import { useEffect, useState } from "react";
import CardGrid from "../../Cards/CardGrid/CardGrid";

const Team = () => {
  let params = useParams();
  const teamId = params.teamId;

  const grids = ["Grid1", "Grid 2", "grid 3"];

  // const [teams, setTeams] = useState<TeamModel[]>([]);

  // useEffect(() => {
  //   getRetros(teamId)
  //     .then(setTeams)
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <>
      {/* {grids.map((_, id) => (
        <CardGrid
          key={id}
          entities={teams}
          backgroundColor={colorSequence[id].background}
          textColor={colorSequence[id].text}
        ></CardGrid>
      ))} */}
    </>
  );
};

export default Team;
