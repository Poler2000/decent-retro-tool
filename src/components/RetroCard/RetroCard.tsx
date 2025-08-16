import type { Color } from "../../Colour";
import Card from "../Card/Card";
import Counter from "../Counter/Counter";
import IconButton from "../IconButton/IconButton";
import "./RetroCard.css"

export interface RetroCardProps {
  id: number;
  title: string;
  backgroundColor: Color;
  textColor: Color;
  onDelete: (id: number) => void;
}

const RetroCard = (props: RetroCardProps) => {
  const { id, title, backgroundColor, textColor, onDelete } = props;

  return <>
    <Card
      id={id}
      backgroundColor="var(--primary-accent-colour)"
      textColor="var(--primary-text-colour)"
    >
      <IconButton additionalClass="remove-button" icon="delete" onClick={() => onDelete(id)}/>
      <input className="card-text" type="text" id="name" placeholder="title" required />
      {/*<h2 className="card-text">{title}</h2>*/}
      <Counter></Counter>
    </Card>
    </>;
};

export default RetroCard;
