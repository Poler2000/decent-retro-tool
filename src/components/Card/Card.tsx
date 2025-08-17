import { useSortable } from "@dnd-kit/sortable";
import "./Card.css";

export interface CardProps extends React.PropsWithChildren {
  id: number;
  defaultStyle: React.CSSProperties;
}

const Card = (props: CardProps) => {
  const { id, defaultStyle, children } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      transition: {
        duration: 250, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const style = transform
    ? {
        ...defaultStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : {
        ...defaultStyle,
        transition,
      };

  return (
    <div
      className="card"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
