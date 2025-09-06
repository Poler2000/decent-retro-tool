import { useParams } from "react-router";
import { createRetro, getRetros, updateRetro } from "../../../retroClient";
import { useEffect, useState } from "react";
import CardGrid from "../../Cards/CardGrid/CardGrid";
import RetroModel from "../../../models/RetroModel";
import { colorSequence } from "../../../ColourSequence";
import type Entity from "../../../models/Entity";

const Team = () => {
  let params = useParams();
  const teamId = parseInt(params.teamId!);

  const [retros, setRetros] = useState<RetroModel[]>([]);

  const loadRetros = () => {
    getRetros(teamId)
      .then(setRetros)
      .catch((error) => console.log(error));
  };

  useEffect(loadRetros, []);

  const handleCreate = (entity: Entity) => {
    const retro = new RetroModel(
      entity.id,
      entity.name !== "" ? entity.name : `Retro ${entity.id}`,
      [],
      teamId
    );

    createRetro(retro)
      .then(loadRetros)
      .catch((error) => console.log(error));
  };

  const handleRename = (entity: Entity) => {
    const retro = new RetroModel(entity.id, entity.name, [], teamId);

    updateRetro(retro)
      .then(loadRetros)
      .catch((error) => console.log(error));
  };

  return (
    <>
      <CardGrid
        entities={retros}
        backgroundColor={colorSequence[1].background}
        textColor={colorSequence[1].text}
        onCreate={handleCreate}
        onUpdate={handleRename}
      ></CardGrid>
    </>
  );
};

export default Team;
