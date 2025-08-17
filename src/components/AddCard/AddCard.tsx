import type { Color } from "../../Colour";
import Card from "../Card/Card";
import IconButton from "../IconButton/IconButton";
import "./AddCard.css";

export interface AddCardProps {
  id: number;
  backgroundColor: Color;
  textColor: Color;
  onClick: () => void;
}

const AddCard = (props: AddCardProps) => {
  const { id, backgroundColor, textColor, onClick } = props;

  return (
    <Card
      id={id}
      defaultStyle={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <IconButton
        additionalClass="add-button"
        iconSize="4em"
        icon="add"
        colors={{ background: backgroundColor, text: textColor }}
        onClick={onClick}
      ></IconButton>
    </Card>
  );
};

export default AddCard;
