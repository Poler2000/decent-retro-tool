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
import type { ColorPair } from "../../../Colour";
import type Entity from "../../../models/Entity";

export interface CardGridProps {
  entities: Entity[];
  colors: ColorPair;
  onCreate: (item: Entity) => void;
  renderItem: (item: Entity) => React.ReactNode;
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

  const { entities, colors, onCreate, renderItem } = props;

  const focusOnNewElement = () => {
    inputRef.current?.focus();
  };

  const handleAdd = () => {
    let newItem = {
      id: Math.max(...items.map((item) => item.id)) + 1,
      name: "",
    };
    setIsFocus(false);
    onCreate(newItem);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const ids = items.map((item) => item.id);
        const oldIndex = ids.indexOf(parseInt(active.id.toString()));
        const newIndex = ids.indexOf(parseInt(over!.id.toString()));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    setItems(entities);
  }, [entities]);

  const itemsCount = items.length;

  useEffect(() => {
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
            {items.slice(0, itemsCount - 1).map(
              (item) => renderItem(item)
              // <RetroCard
              //   key={item.id}
              //   id={item.id}
              //   title={item.name}
              //   backgroundColor={colors.background}
              //   textColor={colors.text}
              //   onDelete={handleDelete}
              //   onEditTitle={handleEditTitle}
              // ></RetroCard>
            )}
            {renderItem(items[itemsCount - 1])}
            {/* <RetroCard
              key={items[itemsCount - 1].id}
              id={items[itemsCount - 1].id}
              title={items[itemsCount - 1].name}
              backgroundColor={colors.background}
              textColor={colors.text}
              onDelete={handleDelete}
              onEditTitle={handleEditTitle}
              ref={inputRef}
            ></RetroCard> */}
          </SortableContext>
        </DndContext>
      ) : (
        <></>
      )}

      <AddCard
        id={crypto.randomUUID()}
        backgroundColor={colors.background}
        textColor={colors.text}
        onClick={handleAdd}
      />
    </div>
  );
};

export default CardGrid;
