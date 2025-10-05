import "./SectionConfigItem.css";

export interface SectionConfigItemProps {
  id: number;
  title: string;
  isChecked: boolean;
  onToggle: (id: number, newState: boolean) => void;
}

const SectionConfigItem = (props: SectionConfigItemProps) => {
  const { id, title, isChecked, onToggle } = props;
  return (
    <div className="section-config-item">
      <input
        className="section-checkbox"
        type="checkbox"
        id={`sectionHidden_${id}`}
        name={`sectionHidden_${id}`}
        onClick={() => onToggle(id, !isChecked)}
        defaultChecked={isChecked}
      />
      <input
        className="section-title-input"
        type="text"
        defaultValue={title}
        id={`sectionTitle_${id}`}
        name="sectionTitle"
      />
    </div>
  );
};

export default SectionConfigItem;
