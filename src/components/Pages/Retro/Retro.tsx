import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type RetroModel from "../../../models/RetroModel";
import { downloadRetro, getRetro, updateRetro } from "../../../retroClient";
import CardGrid from "../../Cards/CardGrid/CardGrid";
import { getColorPair } from "../../../ColourSequence";
import type Entity from "../../../models/Entity";
import RetroCard from "../../Cards/RetroCard/RetroCard";
import { createNote, deleteNote, updateNote } from "../../../noteClient";
import RetroNoteModel from "../../../models/RetroNoteModel";
import "./Retro.css";
import Header from "../../Header/Header";
import SectionConfigDialog from "../../SectionConfigDialog/SectionConfigDialog";
import type RetroSectionModel from "../../../models/RetroSection";
import { getTeam } from "../../../teamClient";
import type TeamModel from "../../../models/TeamModel";

const Retro = () => {
  const { teamId, retroId } = useParams();
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);
  const [dialog, setDialog] = useState<React.ReactNode>();

  const loadTeam = (teamId: number) => {
    getTeam(teamId)
      .then(setTeam)
      .catch((error) => console.log(error));
  };
  const [team, setTeam] = useState<TeamModel>();

  useEffect(() => loadTeam(parseInt(teamId!)), [teamId]);

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
    return (
      <RetroCard
        key={item.id}
        id={item.id}
        title={item.getContent()}
        colors={getColorPair(sectionSequence)}
        onDelete={handleDelete}
        onUpdate={(newTitle: string, score: number, id: number) =>
          handleUpdate(newTitle, score, id, note.sectionId)
        }
        isFocused={isFocused}
        score={note.score}
      ></RetroCard>
    );
  };

  const onSectionsEdited = (sections: RetroSectionModel[]) => {
    console.log("onSectionsEdited");
    console.log(sections);

    const updatedRetro = Object.assign({}, retro, { sections: sections });
    updateRetro(updatedRetro)
      .then(loadRetro)
      .catch((e) => console.log(e));
    setDialog(null);
  };

  const handleEditSections = () => {
    setDialog(() => (
      <SectionConfigDialog
        retroId={retro?.id!}
        retroSections={retro?.sections ?? []}
        onConfirm={onSectionsEdited}
        onCancel={() => setDialog(null)}
      />
    ));
  };

  return (
    <>
      <Header
        breadcrumbs={[
          { link: "/home", text: "Home" },
          { link: `/teams/${teamId}`, text: `${team?.name ?? "Team"}` },
          {
            link: `/teams/${teamId}/retro/${retroId}`,
            text: retro?.title ?? "Retro",
          },
        ]}
        onEdit={handleEditSections}
        onImport={() => {}}
        onExport={() => {
          console.log("export");
          console.log(JSON.stringify(retro));
          downloadRetro(retro?.id!);
        }}
      />
      {dialog}
      <div className="grids-container">
        {retro?.sections.map((section, id) =>
          section.isHidden ? null : (
            <div key={section.id}>
              <h1>{section.getContent()}</h1>
              <CardGrid
                entities={section.notes}
                colors={getColorPair(id)}
                onCreate={(content: string) =>
                  handleCreate(content, section.id)
                }
                renderItem={(item: Entity, isFocused: boolean) =>
                  renderItem(item, isFocused, id)
                }
                isEditing={isEditingEnabled}
              ></CardGrid>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Retro;
