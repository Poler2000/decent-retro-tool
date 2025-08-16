import { useSortable } from "@dnd-kit/sortable";
import type { Color } from "../../Colour";
import "./Card.css";

export interface CardProps extends React.PropsWithChildren {
  id: number;
  backgroundColor: Color;
  textColor: Color;
}

const Card = (props: CardProps) => {
  const { id, backgroundColor, textColor, children } = props;
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: `draggable_${title}`,
  // });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      transition: {
        duration: 250, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  console.log(`${id} ${transition}`);

  const style = transform
    ? {
        backgroundColor: backgroundColor,
        color: textColor,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : {
        backgroundColor: backgroundColor,
        color: textColor,
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
