import RetroCard from "../RetroCard/RetroCard";
import "./CardGrid.css";
import { useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Card from "../Card/Card";

export interface CardGridProps {
  titles: string[];
}

//export interface CardGridProps extends Array<typeof Card> {}

const CardGrid = (props: CardGridProps) => {
  const [items, setItems] = useState([...Array(props.titles.length).keys()]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { titles } = props;
  return (
    <div className="card-grid">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((id) => (
            <RetroCard
              key={id}
              id={id}
              title={titles[id]}
              backgroundColor="var(--primary-accent-colour)"
              textColor="var(--primary-text-colour)"
            ></RetroCard>
          ))}
        </SortableContext>
      </DndContext>
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
