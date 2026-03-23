import { useState } from "react";
import SectionConfigItem from "../SectionConfigItem/SectionConfigItem";
import "./SectionConfigDialog.css";
import RetroSectionModel from "../../../../models/RetroSection";
import Counter from "../../../Counter/Counter";
import Dialog from "../../Dialog/Dialog";

export interface SectionConfigDialogProps {
  retroId: number;
  retroSections: RetroSectionModel[];
  onConfirm: (sections: RetroSectionModel[]) => void;
  onCancel: () => void;
}

const SectionConfigDialog = (props: SectionConfigDialogProps) => {
  const { retroId, retroSections, onConfirm, onCancel } = props;

  const [sections, setSections] = useState(() => retroSections);

  const handleCountChange = (newCount: number) => {
    console.log("handleCountChange");
    console.log(newCount);
    console.log(sections.length);
    if (newCount > sections.length) {
      const newSection =
        newCount > retroSections.length
          ? new RetroSectionModel(-1, "", [], false, retroId)
          : retroSections[newCount - 1];
      setSections([...sections, newSection]);
    } else if (newCount < sections.length) {
      const updatedSections = sections.slice(0, newCount);
      setSections(updatedSections);
    }
  };

  console.log(sections);
  console.log(retroSections);

  const handleUpdate = (order: number, newTitle: string, newState: boolean) => {
    const updatedSections = sections.map((s, idx) => {
      return idx === order
        ? new RetroSectionModel(s.id, newTitle, s.notes, newState, s.retroId!)
        : s;
    });
    setSections(updatedSections);
  };

  return (
    <Dialog onConfirm={() => onConfirm(sections)} onCancel={onCancel}>
      <span className="section-config-count-label">Sections</span>
      <Counter
        score={sections?.length ?? 0}
        onUpdate={handleCountChange}
        delayUpdate={false}
      ></Counter>
      <ul className="section-list">
        {sections?.map((section, order) => (
          <li key={order}>
            <SectionConfigItem
              id={order}
              title={section.getContent()}
              isChecked={!section.isHidden}
              onToggle={(order: number, newState: boolean) =>
                handleUpdate(order, section.getContent(), newState)
              }
              onEditTitle={(order: number, newTitle: string) =>
                handleUpdate(order, newTitle, section.isHidden)
              }
            />
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

export default SectionConfigDialog;
