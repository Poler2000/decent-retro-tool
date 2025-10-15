import type { Color, ColorPair } from "../../../Colour";
import Card from "../Card/Card";
import Counter from "../../Counter/Counter";
import IconButton from "../../Buttons/IconButton/IconButton";
import "./RetroCard.css";

export interface RetroCardProps {
  id: number;
  title: string;
  colors: ColorPair;
  isFocused?: boolean | null;
  onDelete: (id: number) => void;
  onUpdate: (newTitle: string, score: number, id: number) => void;
  score: number;
}

const RetroCard = (props: RetroCardProps) => {
  const { id, title, colors, isFocused, onDelete, onUpdate, score } = props;

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
          className="card-text editable"
          id="name"
          placeholder="title"
          required
          maxLength={100}
          onBlur={(event) => onUpdate(event.target.value, score, id)}
          autoFocus={isFocused ?? false}
          onFocus={(e) => {
            e.currentTarget.selectionStart = 0;
            e.currentTarget.selectionEnd = e.currentTarget.value.length;
          }}
          defaultValue={title}
        />
        <Counter
          colors={colors}
          score={score}
          onUpdate={(newCount: number) => onUpdate(title, newCount, id)}
          delayUpdate={true}
        ></Counter>
      </Card>
    </>
  );
};

export default RetroCard;
