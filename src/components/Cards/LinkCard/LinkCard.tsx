import { Link } from "react-router";
import type { ColorPair } from "../../../Colour";
import IconButton from "../../Buttons/IconButton/IconButton";
import Card from "../Card/Card";
import "./LinkCard.css";

export interface LinkCardProps {
  id: number;
  title: string;
  colors: ColorPair;
  isFocused?: boolean | null;
  onDelete: (id: number) => void;
  onEditTitle: (newTitle: string, id: number) => void;
  linkAddress: string;
}

const LinkCard = (props: LinkCardProps) => {
  const { id, title, colors, isFocused, onDelete, onEditTitle, linkAddress } =
    props;

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
        {isFocused ? (
          <textarea
            className="card-text "
            id="name"
            placeholder="title"
            required
            maxLength={100}
            onBlur={(event) => onEditTitle(event.target.value, id)}
            autoFocus={true}
            onFocus={(e) => {
              e.currentTarget.selectionStart = 0;
              e.currentTarget.selectionEnd = e.currentTarget.value.length;
            }}
            defaultValue={title}
          />
        ) : (
          <Link to={linkAddress} className="card-text card-link">
            {title}
          </Link>
        )}
      </Card>
    </>
  );
};

export default LinkCard;
