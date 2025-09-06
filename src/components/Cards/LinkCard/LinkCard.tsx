import { Link } from "react-router";
import type { ColorPair } from "../../../Colour";
import IconButton from "../../Buttons/IconButton/IconButton";
import Card from "../Card/Card";
import "./LinkCard.css";

export interface LinkCardProps {
  id: number;
  title: string;
  colors: ColorPair;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
  onDelete: (id: number) => void;
  onEditTitle: (newTitle: string, id: number) => void;
}

const LinkCard = (props: LinkCardProps) => {
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
        <Link to={`/teams/${id}`} className="card-text">
          {title}
        </Link>

        {/* <textarea
          className="card-text"
          id="name"
          placeholder="title"
          required
          maxLength={100}
          ref={ref}
          onBlur={(event) => onEditTitle(event.target.value, id)}
        >
          <Link to={`/teams/${id}`}>{title}</Link>
        </textarea> */}
      </Card>
    </>
  );
};

export default LinkCard;
