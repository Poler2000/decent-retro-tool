import CardGrid from "../../Cards/CardGrid/CardGrid";
import { colorSequence } from "../../../ColourSequence";
import { useEffect, useState } from "react";
import { createTeam, getTeams, updateTeam } from "../../../teamClient";
import TeamModel from "../../../models/TeamModel";
import type Entity from "../../../models/Entity";
import LinkCard from "../../Cards/LinkCard/LinkCard";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";

const Home = () => {
  const [teams, setTeams] = useState<TeamModel[]>([]);

  const loadTeams = () => {
    getTeams()
      .then(setTeams)
      .catch((error) => console.log(error));
  };

  const [dialog, setDialog] = useState<React.ReactNode>();

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

  const deleteItem = (id: number) => {
    setDialog(null);
  };

  const handleDelete = (id: number) => {
    setDialog(() => (
      <ConfirmationDialog
        message="Are you sure?"
        onConfirm={() => deleteItem(id)}
        onCancel={() => {
          setDialog(null);
        }}
      />
    ));
  };

  const handleRename = (newTitle: string, id: number) => {
    const team = new TeamModel(id, newTitle);

    updateTeam(team)
      .then(loadTeams)
      .catch((error) => console.log(error));
  };

  const renderTeam = (team: Entity) => {
    return (
      <LinkCard
        key={team.id}
        id={team.id}
        title={team.name}
        colors={{
          background: colorSequence[0].background,
          text: colorSequence[0].text,
        }}
        onDelete={handleDelete}
        onEditTitle={handleRename}
      ></LinkCard>
    );
  };

  return (
    <>
      {dialog}
      <CardGrid
        entities={teams}
        colors={{
          background: colorSequence[0].background,
          text: colorSequence[0].text,
        }}
        onCreate={handleCreate}
        renderItem={renderTeam}
      ></CardGrid>
    </>
  );
};

export default Home;
