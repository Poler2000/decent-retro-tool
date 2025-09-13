import type { Color, ColorPair } from "../../../Colour";
import Card from "../Card/Card";
import Counter from "../../Counter/Counter";
import IconButton from "../../Buttons/IconButton/IconButton";
import "./RetroCard.css";

export interface RetroCardProps {
  id: number;
  title: string;
  colors: ColorPair;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
  onDelete: (id: number) => void;
  onEditTitle: (newTitle: string, id: number) => void;
}

const RetroCard = (props: RetroCardProps) => {
  const { id, title, colors, ref, onDelete, onEditTitle } = props;

  return (
    <>
      <Card
        id={id}
        defaultStyle={{
          backgroundColor: colors.background,
          color: colors.text,
        }}
      >
        <IconButton
          additionalClass="remove-button"
          colors={colors}
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
          onBlur={(event) => onEditTitle(event.target.value, id)}
        >
          {title}
        </textarea>
        <Counter colors={colors}></Counter>
      </Card>
    </>
  );
};

export default RetroCard;
