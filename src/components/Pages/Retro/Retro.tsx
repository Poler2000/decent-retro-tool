import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type RetroModel from "../../../models/RetroModel";
import { getRetro } from "../../../retroClient";
import CardGrid from "../../Cards/CardGrid/CardGrid";
import { colorSequence } from "../../../ColourSequence";

const Retro = () => {
  const { teamId, retroId } = useParams();

  const [retro, setRetro] = useState<RetroModel>();

  const loadRetro = () => {
    getRetro(parseInt(retroId!))
      .then(setRetro)
      .catch((e) => console.log(e));
  };

  useEffect(loadRetro, []);

  return (
    <>
      {retro?.sections.map((section, id) => {
        <CardGrid
          entities={section.notes}
          colors={{
            background: colorSequence[id].background,
            text: colorSequence[id].text,
          }}
          onCreate={handleCreate}
          onUpdate={handleRename}
        ></CardGrid>;
      })}
    </>
  );
};

export default Retro;
