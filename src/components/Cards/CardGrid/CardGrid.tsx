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
import type Entity from "../../../models/Entity";

export interface CardGridProps {
  entities: Entity[];
  backgroundColor: Color;
  textColor: Color;
  onCreate: (entity: Entity) => void;
  onUpdate: (entity: Entity) => void;
}

const CardGrid = (props: CardGridProps) => {
  const [items, setItems] = useState<Entity[]>([]);
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

  const {
    entities,
    backgroundColor,
    textColor,
    onCreate,
    onUpdate: onRename,
  } = props;
  const handleAdd = () => {
    let newItem = {
      id: Math.max(...items.map((item) => item.id)) + 1,
      name: "",
    };
    setItems([...items, newItem]);
    setIsFocus(false);
    onCreate(newItem);
  };

  console.log("entities:", entities);

  const handleEditTitle = (newTitle: string, id: number) => {
    console.log("edit title!");
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: newTitle } : item))
    );
    onRename({ name: newTitle, id: id });
  };

  useEffect(() => {
    console.log("setting items!:");
    setItems(entities);
  }, [entities]);

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
            {items.slice(0, itemsCount - 1).map((item) => (
              <RetroCard
                key={item.id}
                id={item.id}
                title={item.name}
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
