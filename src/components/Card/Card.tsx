import type { Color } from "../../Colour";
import "./Card.css";

export interface CardProps extends React.PropsWithChildren {
  title: string;
  backgroundColor: Color;
  textColor: Color;
}

const Card = (props: CardProps) => {
  const { title, backgroundColor, textColor, children } = props;

  return (
    <div
      className="card"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <h2 className="class-title">{title}</h2>
      {children}
    </div>
  );
};

export default Card;
