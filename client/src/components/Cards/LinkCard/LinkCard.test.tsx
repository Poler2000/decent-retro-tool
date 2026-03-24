import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router";
import { fireEvent } from "@testing-library/react";
import LinkCard from "./LinkCard";
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

describe("<LinkCard /> component", () => {
  const props = {
    id: 1,
    title: "Test Link",
    colors: DEFAULT_COLORS,
    onDelete: vi.fn(),
    onEditTitle: vi.fn(),
    linkAddress: "/test",
  };

  it("renders as a link when not focused", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <LinkCard {...props} isFocused={false} />
        </MemoryRouter>,
      );
    });

    const link = container.querySelector("a") as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.textContent).toBe("Test Link");
    expect(link.getAttribute("href")).toBe("/test");
  });

  it("renders as textarea when focused", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <LinkCard {...props} isFocused={true} />
        </MemoryRouter>,
      );
    });

    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea).toBeTruthy();
    expect(textarea.value).toBe("Test Link");
  });

  it("calls onDelete when delete button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <LinkCard {...props} />
        </MemoryRouter>,
      );
    });

    const deleteBtn = container.querySelector(".remove-button") as HTMLButtonElement;
    await act(async () => {
      deleteBtn.click();
    });
    expect(props.onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onEditTitle on blur when in focused mode", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <LinkCard {...props} isFocused={true} />
        </MemoryRouter>,
      );
    });

    const textarea = container.querySelector("textarea") as HTMLTextAreaElement;
    await act(async () => {
      fireEvent.change(textarea, { target: { value: "New Title" } });
      fireEvent.blur(textarea);
    });
    expect(props.onEditTitle).toHaveBeenCalledWith("New Title", 1);
  });
});
