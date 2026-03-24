import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import RetroCard from "./RetroCard";
import {DEFAULT_COLORS} from "../../../Colour.ts";

// Mock useSortable
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

describe("<RetroCard /> component", () => {
  const props = {
    id: 1,
    title: "Test Retro Card",
    colors: DEFAULT_COLORS,
    onDelete: vi.fn(),
    onUpdate: vi.fn(),
    score: 5,
  };

  it("renders correct content", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<RetroCard {...props} />);
    });

    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea).toBeTruthy();
    expect(textarea.value).toBe("Test Retro Card");

    const counter = container.querySelector(".counter-value") as HTMLElement;
    expect(counter).toBeTruthy();
    expect(counter.textContent).toBe("5");
  });

  it("calls onDelete when delete button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<RetroCard {...props} />);
    });

    const deleteBtn = container.querySelector(".remove-button") as HTMLButtonElement;
    await act(async () => {
      deleteBtn.click();
    });
    expect(props.onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onUpdate on textarea blur", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<RetroCard {...props} />);
    });

    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    await act(async () => {
      fireEvent.change(textarea, { target: { value: "Updated Title" } });
      fireEvent.blur(textarea);
    });
    expect(props.onUpdate).toHaveBeenCalledWith("Updated Title", 5, 1);
  });

  it("calls onUpdate when counter is changed and mouse leaves", async () => {
    const onUpdate = vi.fn();
    const retroProps = { ...props, onUpdate };
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<RetroCard {...retroProps} />);
    });

    const addBtn = container.querySelectorAll("button")[2] as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(addBtn);
    });
    // delayUpdate is true, so it shouldn't call onUpdate yet
    expect(onUpdate).not.toHaveBeenCalled();

    const counterDiv = container.querySelector(".counter") as HTMLElement;
    await act(async () => {
      fireEvent.mouseLeave(counterDiv);
    });
    expect(onUpdate).toHaveBeenCalledWith("Test Retro Card", 6, 1);
  });
});
