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
  onCreate: (content: string) => void;
  renderItem: (item: Entity, isFocused: boolean) => React.ReactNode;
  isEditing: boolean;
}

const CardGrid = (props: CardGridProps) => {
  const [items, setItems] = useState<Entity[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  let [isFocus, setIsFocus] = useState(false);

  const { entities, colors, onCreate, renderItem, isEditing } = props;

  const handleAdd = () => {
    setIsFocus(true);
    onCreate("");
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

  const findIndexById = (id: number) => {
    const idx = items.findIndex((item) => item.id === id);
    return idx == -1 ? 999 : idx;
  };

  useEffect(() => {
    setItems(
      entities.sort((e1, e2) => findIndexById(e1.id) - findIndexById(e2.id))
    );
    //setIsFocus(false);
  }, [entities]);

  const itemsCount = items.length;

  // useEffect(() => {
  //   if (isFocus === false) {
  //     focusOnNewElement();
  //   }
  //   setIsFocus(true);
  // }, [isFocus]);

  return (
    <div className="card-grid">
      {items.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items
              .slice(0, itemsCount - 1)
              .map((item) => renderItem(item, false))}
            {renderItem(items[itemsCount - 1], isFocus && isEditing)}
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
