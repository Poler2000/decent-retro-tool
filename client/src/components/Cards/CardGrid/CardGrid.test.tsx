import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import CardGrid from "./CardGrid";
import type Entity from "../../../models/Entity";
import { DEFAULT_COLORS } from "../../../Colour";

let container: HTMLElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    document.body.removeChild(container);
    container = null;
  }
});

class MockEntity implements Entity {
  id: number;
  content: string;
  constructor(id: number, content: string) {
    this.id = id;
    this.content = content;
  }
  getContent() {
    return this.content;
  }
}

describe("<CardGrid /> component", () => {
  const renderItem = (item: Entity, isFocused: boolean) => (
    <div key={item.id} className="mock-item" data-focused={isFocused}>
      {item.getContent()}
    </div>
  );

  it("renders the entities and AddCard", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const entities = [
      new MockEntity(1, "Entity 1"),
      new MockEntity(2, "Entity 2"),
    ];
    const onCreate = vi.fn();

    await act(async () => {
      root.render(
        <CardGrid
          entities={entities}
          colors={DEFAULT_COLORS}
          onCreate={onCreate}
          renderItem={renderItem}
          isEditing={false}
        />
      );
    });

    const items = container.querySelectorAll(".mock-item");
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe("Entity 1");
    expect(items[1].textContent).toBe("Entity 2");
    
    const addBtn = container.querySelector(".add-button");
    expect(addBtn).toBeTruthy();
  });

  it("calls onCreate when AddCard is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onCreate = vi.fn();

    await act(async () => {
      root.render(
        <CardGrid
          entities={[]}
          colors={DEFAULT_COLORS}
          onCreate={onCreate}
          renderItem={renderItem}
          isEditing={false}
        />
      );
    });

    const addBtn = container.querySelector(".add-button") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(addBtn);
    });

    expect(onCreate).toHaveBeenCalledWith("");
  });

  it("passes isEditing to the last entity in the list", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const entities = [
      new MockEntity(1, "Entity 1"),
      new MockEntity(2, "Entity 2"),
    ];

    await act(async () => {
      root.render(
        <CardGrid
          entities={entities}
          colors={DEFAULT_COLORS}
          onCreate={vi.fn()}
          renderItem={renderItem}
          isEditing={true}
        />
      );
    });

    const items = container.querySelectorAll(".mock-item");
    expect(items[0].getAttribute("data-focused")).toBe("false");
    expect(items[1].getAttribute("data-focused")).toBe("true");
  });

  it("renders correctly without items", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <CardGrid
          entities={[]}
          colors={DEFAULT_COLORS}
          onCreate={vi.fn()}
          renderItem={renderItem}
          isEditing={false}
        />
      );
    });

    const items = container.querySelectorAll(".mock-item");
    expect(items.length).toBe(0);
    
    const addBtn = container.querySelector(".add-button");
    expect(addBtn).toBeTruthy();
  });
});
