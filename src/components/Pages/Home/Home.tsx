import CardGrid from "../../Cards/CardGrid/CardGrid";
import { colorSequence } from "../../../ColourSequence";
import { useEffect, useState } from "react";
import { createTeam, getTeams, updateTeam } from "../../../teamClient";
import TeamModel from "../../../models/TeamModel";
import type Entity from "../../../models/Entity";

const Home = () => {
  const [teams, setTeams] = useState<TeamModel[]>([]);

  const loadTeams = () => {
    getTeams()
      .then(setTeams)
      .catch((error) => console.log(error));
  };

  useEffect(loadTeams, []);

  const handleCreate = (entity: Entity) => {
    const team = new TeamModel(
      entity.id,
      entity.name !== "" ? entity.name : `Team ${entity.id}`
    );

    createTeam(team)
      .then(loadTeams)
      .catch((error) => console.log(error));
  };

  const handleRename = (entity: Entity) => {
    const team = new TeamModel(entity.id, entity.name);

    updateTeam(team)
      .then(loadTeams)
      .catch((error) => console.log(error));
  };

  console.log(teams);

  return (
    <>
      <CardGrid
        entities={teams}
        backgroundColor={colorSequence[0].background}
        textColor={colorSequence[0].text}
        onCreate={handleCreate}
        onUpdate={handleRename}
      ></CardGrid>
    </>
  );
};

export default Home;
