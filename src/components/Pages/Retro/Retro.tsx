import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type RetroModel from "../../../models/RetroModel";
import { getRetro } from "../../../retroClient";
import CardGrid from "../../Cards/CardGrid/CardGrid";
import { colorSequence } from "../../../ColourSequence";
import type Entity from "../../../models/Entity";
import RetroCard from "../../Cards/RetroCard/RetroCard";

const Retro = () => {
  const { teamId, retroId } = useParams();

  const [retro, setRetro] = useState<RetroModel>();

  const loadRetro = () => {
    getRetro(parseInt(retroId!))
      .then(setRetro)
      .catch((e) => console.log(e));
  };

  useEffect(loadRetro, []);

  const handleCreate = (content: string) => {};

  const handleDelete = (id: number) => {};

  const handleUpdate = (newTitle: string, id: number) => {};

  const renderItem = (item: Entity, isFocused: boolean) => {
    return (
      <RetroCard
        id={item.id}
        title={item.getContent()}
        colors={{
          background: colorSequence[0].background,
          text: colorSequence[0].text,
        }}
        onDelete={handleDelete}
        onEditTitle={handleUpdate}
      ></RetroCard>
    );
  };

  console.log(retro?.sections);
  console.log(retro?.sections.map((section) => `$section ${section}`));

  return (
    <>
      {retro?.sections.map((section, id) => (
        <div>
          <h1>{section.getContent()}</h1>
          <CardGrid
            entities={section.notes}
            colors={{
              background: colorSequence[id].background,
              text: colorSequence[id].text,
            }}
            onCreate={handleCreate}
            renderItem={renderItem}
            isEditing={false}
          ></CardGrid>
        </div>
      ))}
    </>
  );
};

export default Retro;
