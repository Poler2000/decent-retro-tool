import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import AddCard from "./AddCard";

// Mock useSortable for Card component
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

describe("<AddCard /> component", () => {
  it("renders with correct styles and triggers onClick", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onClick = vi.fn();
    const backgroundColor = "var(--primary-background-colour)";
    const textColor = "rgb(255, 255, 255)";

    await act(async () => {
      root.render(
        <AddCard
          id={crypto.randomUUID()}
          backgroundColor={backgroundColor}
          textColor={textColor}
          onClick={onClick}
        />,
      );
    });

    const cardElement = container.querySelector(".card") as HTMLElement;
    expect(cardElement).toBeTruthy();
    expect(cardElement.style.backgroundColor).toBe(backgroundColor);
    expect(cardElement.style.color).toBe(textColor);

    const button = container.querySelector("button") as HTMLButtonElement;
    expect(button).toBeTruthy();
    expect(button.className).toContain("add-button");

    await act(async () => {
      button.click();
    });
    expect(onClick).toHaveBeenCalledOnce();
  });
});
