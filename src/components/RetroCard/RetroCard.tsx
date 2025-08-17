import type { Color } from "../../Colour";
import Card from "../Card/Card";
import Counter from "../Counter/Counter";
import IconButton from "../IconButton/IconButton";
import "./RetroCard.css";

export interface RetroCardProps {
  id: number;
  title: string;
  backgroundColor: Color;
  textColor: Color;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
  onDelete: (id: number) => void;
}

const RetroCard = (props: RetroCardProps) => {
  const { id, title, backgroundColor, textColor, ref, onDelete } = props;

  return (
    <>
      <Card
        id={id}
        defaultStyle={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <IconButton
          additionalClass="remove-button"
          colors={{ background: backgroundColor, text: textColor }}
          icon="delete"
          onClick={() => onDelete(id)}
        />
        <textarea
          className="card-text"
          id="name"
          placeholder="title"
          required
          maxLength={100}
          ref={ref}
        >
          {title}
        </textarea>
        <Counter
          colors={{ background: backgroundColor, text: textColor }}
        ></Counter>
      </Card>
    </>
  );
};

export default RetroCard;
