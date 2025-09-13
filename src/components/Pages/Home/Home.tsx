import CardGrid from "../../Cards/CardGrid/CardGrid";
import { colorSequence } from "../../../ColourSequence";
import { useEffect, useState } from "react";
import {
  createTeam,
  deleteTeam,
  getTeams,
  updateTeam,
} from "../../../teamClient";
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
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);

  useEffect(loadTeams, []);

  const handleCreate = (content: string) => {
    const team = new TeamModel(-1, content !== "" ? content : `New Team`);

    createTeam(team)
      .then(loadTeams)
      .then(() => setIsEditingEnabled(true))
      .catch((error) => console.log(error));
  };

  const deleteItem = (id: number) => {
    setDialog(null);
    deleteTeam(id)
      .then(loadTeams)
      .catch((error) => console.log(error));
  };

  const handleDelete = (id: number) => {
    const title = teams.find((t) => t.id === id)?.getContent() ?? "Unknown";

    setDialog(() => (
      <ConfirmationDialog
        message={`Are you sure to delete the team: ${title}?`}
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
      .then(() => setIsEditingEnabled(false))
      .catch((error) => console.log(error));
  };

  const renderTeam = (team: Entity, isFocused: boolean) => {
    return (
      <LinkCard
        key={team.id}
        id={team.id}
        title={(team as TeamModel).getContent()}
        colors={{
          background: colorSequence[0].background,
          text: colorSequence[0].text,
        }}
        onDelete={handleDelete}
        onEditTitle={handleRename}
        isFocused={isFocused}
        linkAddress={`/teams/${team.id}`}
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
        isEditing={isEditingEnabled}
      ></CardGrid>
    </>
  );
};

export default Home;
