import RetroCard from "../RetroCard/RetroCard";
import "./CardGrid.css";

export interface CardGridProps {
  titles: string[];
}

//export interface CardGridProps extends Array<typeof Card> {}

const CardGrid = (props: CardGridProps) => {
  const { titles } = props;
  return (
    <div className="card-grid">
      {titles.map((title) => (
        <RetroCard
          title={title}
          backgroundColor="var(--primary-accent-colour)"
          textColor="var(--primary-text-colour)"
        ></RetroCard>
      ))}
    </div>
  );
};

export default CardGrid;
