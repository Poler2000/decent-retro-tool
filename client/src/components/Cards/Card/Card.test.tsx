import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import Card from "./Card";

// Mock useSortable since we don't need its full functionality for basic rendering tests
vi.mock("@dnd-kit/sortable", () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    transition: null,
  }),
}));

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

describe("<Card /> component", () => {
  it("renders children and applies default styles", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const defaultStyle = { backgroundColor: "red", color: "white" };
    
    await act(async () => {
      root.render(
        <Card id={crypto.randomUUID()} defaultStyle={defaultStyle}>
          <span data-testid="child">Hello World</span>
        </Card>,
      );
    });

    const cardElement = container.querySelector(".card") as HTMLElement;
    expect(cardElement).toBeTruthy();
    expect(cardElement.style.backgroundColor).toBe("red");
    expect(cardElement.style.color).toBe("white");
    
    const childElement = container.querySelector('[data-testid="child"]');
    expect(childElement).toBeTruthy();
    expect(childElement?.textContent).toBe("Hello World");
  });
});
