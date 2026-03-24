import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";

import Counter from "./Counter";
import {DEFAULT_COLORS} from "../../Colour";

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

describe("<Counter /> component", () => {
  it("renders with initial score", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Counter
          colors={DEFAULT_COLORS}
          score={10}
          onUpdate={() => {}}
        />
      );
    });
    expect(container.textContent).toContain("10");
  });

  it("increments the count when add button is clicked", async () => {
    const onUpdate = vi.fn();
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Counter
          colors={DEFAULT_COLORS}
          score={5}
          onUpdate={onUpdate}
        />
      );
    });

    const buttons = container.querySelectorAll("button");
    const addButton = Array.from(buttons).find(b => b.textContent === "add");
    if (!addButton) throw new Error("Add button not found");

    await act(async () => {
      addButton.click();
    });

    expect(container.textContent).toContain("6");
    expect(onUpdate).toHaveBeenCalledWith(6);
  });

  it("decrements the count when remove button is clicked", async () => {
    const onUpdate = vi.fn();
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Counter
          colors={DEFAULT_COLORS}
          score={5}
          onUpdate={onUpdate}
        />
      );
    });

    const buttons = container.querySelectorAll("button");
    const removeButton = Array.from(buttons).find(b => b.textContent === "remove");
    if (!removeButton) throw new Error("Remove button not found");

    await act(async () => {
      removeButton.click();
    });

    expect(container.textContent).toContain("4");
    expect(onUpdate).toHaveBeenCalledWith(4);
  });

  it("respects MinCount (0)", async () => {
    const onUpdate = vi.fn();
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Counter
          colors={DEFAULT_COLORS}
          score={0}
          onUpdate={onUpdate}
        />
      );
    });

    const buttons = container.querySelectorAll("button");
    const removeButton = Array.from(buttons).find(b => b.textContent === "remove");
    if (!removeButton) throw new Error("Remove button not found");

    await act(async () => {
      removeButton.click();
    });

    expect(container.textContent).toContain("0");
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it("delays onUpdate when delayUpdate is true until mouseLeave", async () => {
    const onUpdate = vi.fn();
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Counter
          colors={DEFAULT_COLORS}
          score={5}
          onUpdate={onUpdate}
          delayUpdate={true}
        />
      );
    });

    const buttons = container.querySelectorAll("button");
    const addButton = Array.from(buttons).find(b => b.textContent === "add");
    if (!addButton) throw new Error("Add button not found");

    await act(async () => {
      addButton.click();
    });
    await act(async () => {
      addButton.click();
    });

    expect(container.textContent).toContain("7");
    expect(onUpdate).not.toHaveBeenCalled();

    const counterDiv = container.querySelector(".counter");
    if (!counterDiv) throw new Error("Counter div not found");

    await act(async () => {
      fireEvent.mouseLeave(counterDiv);
    });
    expect(onUpdate).toHaveBeenCalledWith(7);
  });
});
