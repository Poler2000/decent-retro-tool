import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RetroModel from "../../../models/RetroModel";
import { downloadRetro, getRetro, updateRetro } from "../../../api/retroClient";
import CardGrid from "../../Cards/CardGrid/CardGrid";
import { getColorPair } from "../../../ColourSequence";
import type Entity from "../../../models/Entity";
import RetroCard from "../../Cards/RetroCard/RetroCard";
import { createNote, deleteNote, updateNote } from "../../../api/noteClient";
import RetroNoteModel from "../../../models/RetroNoteModel";
import "./Retro.css";
import Header from "../../Header/Header";
import type RetroSectionModel from "../../../models/RetroSection";
import { getTeam } from "../../../api/teamClient";
import type TeamModel from "../../../models/TeamModel";
import SectionConfigDialog from "../../Dialogs/SectionConfig/SectionConfigDialog/SectionConfigDialog";
import type { SortOption } from "../../../sortOptions";
import RetroUpdateModel from "../../../models/update/RetroUpdateModel";
import RetroNoteCreateModel from "../../../models/create/RetroNoteCreateModel";
import SectionUpdateModel from "../../../models/update/SectionUpdateModel";

const Retro = () => {
  const { teamId, retroId } = useParams();
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [dialog, setDialog] = useState<React.ReactNode>();
  const [sortOption, setSortOption] = useState<SortOption>("default");

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

  const handleRetroRename = (newTitle: string) => {
    const updatedRetro = new RetroUpdateModel(newTitle, undefined);
    updateRetro(retro!.id, updatedRetro)
      .then(loadRetro)
      .catch((e) => console.log(e));
  };

  const handleCreate = (content: string, sectionId: number) => {
    const note = new RetroNoteCreateModel(content, 1, sectionId);

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
    const note = new RetroNoteCreateModel(newTitle, score, sectionId);

    updateNote(id, note)
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
    const updatedRetro = new RetroUpdateModel(
      retro!.title,
      sections.map(
        (s) =>
          new SectionUpdateModel(
            s.id,
            s.title,
            s.isHidden,
            s.notes.map(
              (n) => new RetroNoteCreateModel(n.content, n.score, s.id)
            )
          )
      )
    );

    updateRetro(retro!.id, updatedRetro)
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

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      alert("Please upload a valid JSON file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        const importedRetro = RetroModel.fromJson(parsed);

        const updatedRetro = new RetroUpdateModel(
          retro?.title!,
          importedRetro.sections.map(
            (s) =>
              new SectionUpdateModel(
                s.id,
                s.title,
                s.isHidden,
                s.notes.map(
                  (n) => new RetroNoteCreateModel(n.content, n.score, s.id)
                )
              )
          )
        );

        updateRetro(retro!.id, updatedRetro)
          .then(loadRetro)
          .catch((err) => console.error("Error updating retro:", err));

        setRetro(importedRetro);
      } catch (err) {
        console.error("Error parsing JSON file:", err);
        alert("Invalid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  const sortOptions = RetroNoteModel.getSortOptions();

  return (
    <>
      <Header
        onEntityRename={(newTitle: string) => handleRetroRename(newTitle)}
        breadcrumbs={[
          { link: "/home", text: "Home" },
          { link: `/teams/${teamId}`, text: `${team?.name ?? "Team"}` },
          {
            link: `/teams/${teamId}/retro/${retroId}`,
            text: retro?.title ?? "Retro",
          },
        ]}
        onEdit={handleEditSections}
        onImport={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".json,application/json";
          input.onchange = handleFileChange;
          document.body.appendChild(input);
          input.click();
          document.body.removeChild(input);
        }}
        onExport={() => {
          downloadRetro(retro?.id!);
        }}
        sortConfig={{
          options: sortOptions,
          value: sortOption ?? "default",
          onSortChange: (option: SortOption) => {
            setSortOption(option);
          },
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
                sortFunction={
                  RetroNoteModel.getSortFunction(sortOption) ?? undefined
                }
                onResetSort={() => setSortOption("default")}
              ></CardGrid>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Retro;
