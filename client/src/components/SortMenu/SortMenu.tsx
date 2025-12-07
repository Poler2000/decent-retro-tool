import { getSortOptionLabel, type SortOption } from "../../sortOptions";
import "./SortMenu.css";

export interface SortMenuProps {
  options: SortOption[];
  onSortChange: (option: SortOption) => void;
  value: SortOption;
}

const SortMenu = (props: SortMenuProps) => {
  const { options, onSortChange, value } = props;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    onSortChange(value);
  };

  console.log("Rendering SortMenu with value:", value);
  console.log("Available options:", options);

  return (
    <div className="sort-options">
      <label htmlFor="sort-options">Sort:</label>
      <select
        className="sort-select"
        name="sort-options"
        onChange={handleSortChange}
        value={value}
      >
        {options.includes(value) ? null : (
          <option selected>{getSortOptionLabel(value)}</option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {getSortOptionLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortMenu;
