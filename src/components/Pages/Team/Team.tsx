import { useParams } from "react-router";
import {
  createRetro,
  deleteRetro,
  getRetros,
  updateRetro,
} from "../../../api/retroClient";
import { useEffect, useState } from "react";
import CardGrid from "../../Cards/CardGrid/CardGrid";
import RetroModel from "../../../models/RetroModel";
import { getColorPair } from "../../../ColourSequence";
import type Entity from "../../../models/Entity";
import LinkCard from "../../Cards/LinkCard/LinkCard";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog/ConfirmationDialog";
import Header from "../../Header/Header";
import type TeamModel from "../../../models/TeamModel";
import { getTeam, updateTeam } from "../../../api/teamClient";
import RetroCreateModel from "../../../models/create/RetroCreateModel";
import RetroUpdateModel from "../../../models/update/RetroUpdateModel";
import TeamCreateModel from "../../../models/create/TeamCreateModel";
import type { SortOption } from "../../../sortOptions";

const Team = () => {
  let params = useParams();
  const teamId = parseInt(params.teamId!);

  const loadTeam = (teamId: number) => {
    getTeam(teamId)
      .then(setTeam)
      .catch((error) => console.log(error));
  };
  const [team, setTeam] = useState<TeamModel>();

  useEffect(() => loadTeam(teamId), [teamId]);

  const [retros, setRetros] = useState<RetroModel[]>([]);
  const [dialog, setDialog] = useState<React.ReactNode>();
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>();

  const loadRetros = () => {
    getRetros(teamId)
      .then(setRetros)
      .catch((error) => console.log(error));
  };

  useEffect(loadRetros, []);

  const handleCreate = (content: string) => {
    const retro = new RetroCreateModel(
      content !== "" ? content : `New Retro`,
      teamId
    );

    createRetro(retro)
      .then(loadRetros)
      .then(() => setIsEditingEnabled(true))
      .catch((error) => console.log(error));
  };

  const deleteItem = (id: number) => {
    setDialog(null);
    deleteRetro(id)
      .then(loadRetros)
      .catch((error) => console.log(error));
  };

  const handleDelete = (id: number) => {
    const title = retros.find((r) => r.id === id)?.getContent() ?? "Unknown";

    setDialog(() => (
      <ConfirmationDialog
        message={`Are you sure to delete the retro: ${title}?`}
        onConfirm={() => deleteItem(id)}
        onCancel={() => {
          setDialog(null);
        }}
      />
    ));
  };

  const handleRename = (newTitle: string, id: number) => {
    const retro = retros.find((r) => r.id === id);
    console.log(retro);
    const retroUpdate = new RetroUpdateModel(newTitle);

    updateRetro(id, retroUpdate)
      .then(loadRetros)
      .then(() => setIsEditingEnabled(false))
      .catch((error) => console.log(error));
  };

  const renderRetro = (retro: Entity, isFocused: boolean) => {
    return (
      <LinkCard
        key={retro.id}
        id={retro.id}
        title={retro.getContent()}
        colors={getColorPair(1)}
        onDelete={handleDelete}
        onEditTitle={handleRename}
        isFocused={isFocused}
        linkAddress={`/teams/${teamId}/retro/${retro.id}`}
      ></LinkCard>
    );
  };

  const handleTeamRename = (newTitle: string) => {
    const updatedTeam = new TeamCreateModel(newTitle);
    updateTeam(team!.id, updatedTeam)
      .then(() => loadTeam(teamId))
      .catch((e) => console.log(e));
  };

  console.log(retros);

  return (
    <>
      <Header
        onEntityRename={(newTitle: string) => handleTeamRename(newTitle)}
        breadcrumbs={[
          { link: "/home", text: "Home" },
          { link: `/teams/${teamId}`, text: `${team?.name ?? "Team"}` },
        ]}
        onSort={(option) => {
          setSortOption(option);
          console.log("Sort option selected:", option);
        }}
      />
      {dialog}
      <CardGrid
        entities={retros}
        colors={getColorPair(1)}
        onCreate={handleCreate}
        renderItem={renderRetro}
        isEditing={isEditingEnabled}
        sortFunction={RetroModel.getSortFunction(sortOption) ?? undefined}
      ></CardGrid>
    </>
  );
};

export default Team;
