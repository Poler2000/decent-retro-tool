import { getSortOptionLabel, type SortOption } from "../../sortOptions";
import "./SortMenu.css";

export interface SortMenuProps {
  options: SortOption[];
  onSortChange: (option: SortOption) => void;
}

const SortMenu = (props: SortMenuProps) => {
  const { options, onSortChange } = props;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    onSortChange(value);
  };

  return (
    <div className="sort-options">
      <label htmlFor="sort-options">Sort:</label>
      <select
        className="sort-select"
        name="sort-options"
        onChange={handleSortChange}
      >
        <option disabled selected>
          Default
        </option>
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
