import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import SectionConfigItem from "./SectionConfigItem";

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

describe("<SectionConfigItem /> component", () => {
  it("renders correctly with provided props", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <SectionConfigItem
          id={1}
          title="Test Section"
          isChecked={true}
          onToggle={vi.fn()}
          onEditTitle={vi.fn()}
        />
      );
    });

    const checkbox = container.querySelector(".section-checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    
    const input = container.querySelector(".section-title-input") as HTMLInputElement;
    expect(input.value).toBe("Test Section");
  });

  it("calls onToggle when checkbox is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onToggle = vi.fn();

    await act(async () => {
      root.render(
        <SectionConfigItem
          id={1}
          title="Test Section"
          isChecked={false}
          onToggle={onToggle}
          onEditTitle={vi.fn()}
        />
      );
    });

    const checkbox = container.querySelector(".section-checkbox") as HTMLInputElement;
    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(onToggle).toHaveBeenCalledWith(1, false);
  });

  it("calls onEditTitle when input is unclicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onEditTitle = vi.fn();

    await act(async () => {
      root.render(
        <SectionConfigItem
          id={1}
          title="Test Section"
          isChecked={true}
          onToggle={vi.fn()}
          onEditTitle={onEditTitle}
        />
      );
    });

    const input = container.querySelector(".section-title-input") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: "New Title" } });
      fireEvent.blur(input);
    });

    expect(onEditTitle).toHaveBeenCalledWith(1, "New Title");
  });
});
