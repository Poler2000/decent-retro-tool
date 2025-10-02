import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type RetroModel from "../../../models/RetroModel";
import { getRetro } from "../../../retroClient";
import CardGrid from "../../Cards/CardGrid/CardGrid";
import { colorSequence } from "../../../ColourSequence";
import type Entity from "../../../models/Entity";
import RetroCard from "../../Cards/RetroCard/RetroCard";
import { createNote, deleteNote, updateNote } from "../../../noteClient";
import RetroNoteModel from "../../../models/RetroNoteModel";
import "./Retro.css";

const Retro = () => {
  const { teamId, retroId } = useParams();
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);

  const [retro, setRetro] = useState<RetroModel>();

  const loadRetro = () => {
    getRetro(parseInt(retroId!))
      .then(setRetro)
      .catch((e) => console.log(e));
  };

  useEffect(loadRetro, []);

  const handleCreate = (content: string, sectionId: number) => {
    const note = new RetroNoteModel(-1, content, 1, sectionId);

    createNote(note)
      .then(loadRetro)
      .then(() => setIsEditingEnabled(true))
      .catch((e) => console.log(e));
  };

  const handleDelete = (id: number) => {
    deleteNote(id)
      .then(loadRetro)
      .catch((e) => console.log(e));
  };

  const handleUpdate = (
    newTitle: string,
    score: number,
    id: number,
    sectionId: number
  ) => {
    const note = new RetroNoteModel(id, newTitle, score, sectionId);

    updateNote(note)
      .then(loadRetro)
      .then(() => setIsEditingEnabled(false))
      .catch((e) => console.log(e));
  };

  const renderItem = (
    item: Entity,
    isFocused: boolean,
    sectionSequence: number
  ) => {
    const note = item as RetroNoteModel;
    console.log(note);
    return (
      <RetroCard
        key={item.id}
        id={item.id}
        title={item.getContent()}
        colors={{
          background: colorSequence[sectionSequence].background,
          text: colorSequence[sectionSequence].text,
        }}
        onDelete={handleDelete}
        onUpdate={(newTitle: string, score: number, id: number) =>
          handleUpdate(newTitle, score, id, note.sectionId)
        }
        isFocused={isFocused}
        score={note.score}
      ></RetroCard>
    );
  };

  return (
    <div className="grids-container">
      {retro?.sections.map((section, id) => (
        <div key={section.id}>
          <h1>{section.getContent()}</h1>
          <CardGrid
            entities={section.notes}
            colors={{
              background: colorSequence[id].background,
              text: colorSequence[id].text,
            }}
            onCreate={(content: string) => handleCreate(content, section.id)}
            renderItem={(item: Entity, isFocused: boolean) =>
              renderItem(item, isFocused, id)
            }
            isEditing={isEditingEnabled}
          ></CardGrid>
        </div>
      ))}
    </div>
  );
};

export default Retro;
