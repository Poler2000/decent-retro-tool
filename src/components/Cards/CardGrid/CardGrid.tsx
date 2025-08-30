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
import type TeamModel from "../../../models/TeamModel";

export interface CardGridProps {
  teams: TeamModel[];
  backgroundColor: Color;
  textColor: Color;
}

const CardGrid = (props: CardGridProps) => {
  const [items, setItems] = useState<TeamModel[]>([]);
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
    setItems((l) => l.filter((item) => item.id !== id));
  };

  const focusOnNewElement = () => {
    console.log(inputRef.current);
    inputRef.current?.focus();
  };

  const { teams, backgroundColor, textColor } = props;
  const handleAdd = () => {
    let newItem = {
      id: Math.max(...items.map((item) => item.id)) + 1,
      name: "",
    };
    setItems([...items, newItem]);
    setIsFocus(false);
  };

  const handleEditTitle = (newTitle: string, id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newTitle } : item))
    );
  };

  useEffect(() => {
    setItems(teams);
  }, [teams]);

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
      {items.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.slice(0, itemsCount - 1).map((team) => (
              <RetroCard
                key={team.id}
                id={team.id}
                title={team.name}
                backgroundColor={backgroundColor}
                textColor={textColor}
                onDelete={handleDelete}
                onEditTitle={handleEditTitle}
              ></RetroCard>
            ))}
            <RetroCard
              key={items[itemsCount - 1].id}
              id={items[itemsCount - 1].id}
              title={items[itemsCount - 1].name}
              backgroundColor={backgroundColor}
              textColor={textColor}
              onDelete={handleDelete}
              onEditTitle={handleEditTitle}
              ref={inputRef}
            ></RetroCard>
          </SortableContext>
        </DndContext>
      ) : (
        <></>
      )}

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
        const ids = items.map((item) => item.id);
        const oldIndex = ids.indexOf(parseInt(active.id.toString()));
        const newIndex = ids.indexOf(parseInt(over!.id.toString()));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default CardGrid;
