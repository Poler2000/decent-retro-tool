import "./SortMenu.css";

const SortMenu = () => {
  return (
    <div className="sort-options">
      {/* <Button
        colors={{
          background: "var(--primary-background-colour)",
          text: "var(--primary-text-colour)",
        }}
        onClick={() => {}}
      >
        Score - Ascending
      </Button> */}
      <label htmlFor="sort-options">Sort:</label>
      <select className="sort-select" name="sort-options">
        <option disabled selected>
          Default
        </option>
        <option value="score-asc">Highest Score</option>
        <option value="score-desc">Lowest Score</option>
        <option value="date-asc">Oldest First</option>
        <option value="date-desc">Newest First</option>
        <option value="title-asc">A to Z</option>
        <option value="title-desc">Z to A</option>
      </select>
    </div>
  );
};

export default SortMenu;
