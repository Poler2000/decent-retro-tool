import { useState } from "react";
import SectionConfigItem from "../SectionConfigItem/SectionConfigItem";
import "./SectionConfigDialog.css";
import RetroSectionModel from "../../../../models/RetroSection";
import Counter from "../../../Counter/Counter";
import Button from "../../../Buttons/Button/Button";

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
      const newSection = new RetroSectionModel(-1, "", [], false, retroId);
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
    <div className="section-config-dialog-backdrop">
      <div className="section-config-dialog">
        <span className="section-config-count-label">Sections</span>
        <Counter
          colors={{
            background: "var(--primary-background-colour)",
            text: "var(--primary-text-colour)",
          }}
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
        <div className="confirm-dialog-btn-container">
          <Button
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
            onClick={onCancel}
            additionalClass="confirm-dialog-btn confirm-dialog-btn-cancel"
          >
            Cancel
          </Button>
          <Button
            colors={{
              background: "var(--primary-background-colour)",
              text: "var(--primary-text-colour)",
            }}
            onClick={() => onConfirm(sections)}
            additionalClass="confirm-dialog-btn confirm-dialog-btn-confirm"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionConfigDialog;
