import RetroCard from "../RetroCard/RetroCard";
import "./CardGrid.css";
import { useEffect, useRef, useState } from "react";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import AddCard from "../AddCard/AddCard";
import type { Color } from "../../../Colour";

export interface CardGridProps {
  titles: string[];
  backgroundColor: Color;
  textColor: Color;
}

const CardGrid = (props: CardGridProps) => {
  const [items, setItems] = useState([...Array(props.titles.length).keys()]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  let [isFocus, setIsFocus] = useState(true);

  const handleDelete = (id: number) => {
    setItems((l) => l.filter((item) => item !== id));
  };

  const focusOnNewElement = () => {
    console.log(inputRef.current);
    inputRef.current?.focus();
  };

  const { titles, backgroundColor, textColor } = props;
  const handleAdd = () => {
    setItems([...items, Math.max(...items) + 1]);
    setIsFocus(false);
  };

  const itemsCount = items.length;

  useEffect(() => {
    console.log("hello");
    if (isFocus === false) {
      focusOnNewElement();
    }
    setIsFocus(true);
  }, [isFocus]);

  return (
    <div className="card-grid">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.slice(0, itemsCount - 1).map((id) => (
            <RetroCard
              key={id}
              id={id}
              title={titles[id]}
              backgroundColor={backgroundColor}
              textColor={textColor}
              onDelete={handleDelete}
            ></RetroCard>
          ))}
          <RetroCard
            key={items[itemsCount - 1]}
            id={items[itemsCount - 1]}
            title={titles[items[itemsCount - 1]]}
            backgroundColor={backgroundColor}
            textColor={textColor}
            onDelete={handleDelete}
            ref={inputRef}
          ></RetroCard>
        </SortableContext>
      </DndContext>
      <AddCard
        id={1324}
        backgroundColor={backgroundColor}
        textColor={textColor}
        onClick={handleAdd}
      />
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(parseInt(active.id.toString()));
        const newIndex = items.indexOf(parseInt(over!.id.toString()));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default CardGrid;
