import type { SortOption } from "../../sortOptions";
import "./SortMenu.css";

export interface SortMenuProps {
  onSortChange: (option: SortOption) => void;
}

const SortMenu = (props: SortMenuProps) => {
  const { onSortChange } = props;

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
        <option value="score-asc">Highest Score</option>
        <option value="score-desc">Lowest Score</option>
        <option value="date-asc">Oldest First</option>
        <option value="date-desc">Newest First</option>
        <option value="name-asc">A to Z</option>
        <option value="name-desc">Z to A</option>
      </select>
    </div>
  );
};

export default SortMenu;
