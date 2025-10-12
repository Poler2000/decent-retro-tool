import "./SectionConfigItem.css";

export interface SectionConfigItemProps {
  id: number;
  title: string;
  isChecked: boolean;
  onToggle: (id: number, newState: boolean) => void;
  onEditTitle: (id: number, newTitle: string) => void;
}

const SectionConfigItem = (props: SectionConfigItemProps) => {
  const { id, title, isChecked, onToggle, onEditTitle } = props;
  return (
    <div className="section-config-item">
      <input
        className="section-checkbox"
        type="checkbox"
        id={`sectionHidden_${id}`}
        name={`sectionHidden_${id}`}
        onClick={() => onToggle(id, isChecked)}
        defaultChecked={isChecked}
      />
      <input
        className="section-title-input"
        type="text"
        defaultValue={title}
        onBlur={(event) => onEditTitle(id, event.target.value)}
        id={`sectionTitle_${id}`}
        name="sectionTitle"
      />
    </div>
  );
};

export default SectionConfigItem;
