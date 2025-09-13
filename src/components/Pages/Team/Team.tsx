import { useParams } from "react-router";
import {
  createRetro,
  deleteRetro,
  getRetros,
  updateRetro,
} from "../../../retroClient";
import { useEffect, useState } from "react";
import CardGrid from "../../Cards/CardGrid/CardGrid";
import RetroModel from "../../../models/RetroModel";
import { colorSequence } from "../../../ColourSequence";
import type Entity from "../../../models/Entity";
import LinkCard from "../../Cards/LinkCard/LinkCard";
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";

const Team = () => {
  let params = useParams();
  const teamId = parseInt(params.teamId!);

  const [retros, setRetros] = useState<RetroModel[]>([]);
  const [dialog, setDialog] = useState<React.ReactNode>();
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);

  const loadRetros = () => {
    getRetros(teamId)
      .then(setRetros)
      .catch((error) => console.log(error));
  };

  useEffect(loadRetros, []);

  const handleCreate = (content: string) => {
    const retro = new RetroModel(
      -1,
      content !== "" ? content : `New Retro`,
      [],
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
    const retro = new RetroModel(id, newTitle, [], teamId);

    updateRetro(retro)
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
        colors={{
          background: colorSequence[1].background,
          text: colorSequence[1].text,
        }}
        onDelete={handleDelete}
        onEditTitle={handleRename}
        isFocused={isFocused}
        linkAddress={`/teams/${teamId}/retro/${retro.id}`}
      ></LinkCard>
    );
  };

  console.log(retros);

  return (
    <>
      {dialog}
      <CardGrid
        entities={retros}
        colors={{
          background: colorSequence[1].background,
          text: colorSequence[1].text,
        }}
        onCreate={handleCreate}
        renderItem={renderRetro}
        isEditing={isEditingEnabled}
      ></CardGrid>
    </>
  );
};

export default Team;
