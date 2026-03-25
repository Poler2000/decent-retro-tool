import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import SortMenu from "./SortMenu";
import type { SortOption } from "../../sortOptions";

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

describe("<SortMenu /> component", () => {
  it("renders correctly with options", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const options: SortOption[] = ["default", "score-desc"];
    const onSortChange = vi.fn();

    await act(async () => {
      root.render(
        <SortMenu
          options={options}
          value="default"
          onSortChange={onSortChange}
        />
      );
    });

    const select = container.querySelector("select") as HTMLSelectElement;
    expect(select).toBeTruthy();
    expect(select.value).toBe("default");
    
    const renderedOptions = container.querySelectorAll("option");
    expect(renderedOptions.length).toBe(2);
    expect(renderedOptions[0].textContent).toBe("Default");
    expect(renderedOptions[1].textContent).toBe("Highest Score");
  });

  it("calls onSortChange when select value changes", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const options: SortOption[] = ["default", "score-desc"];
    const onSortChange = vi.fn();

    await act(async () => {
      root.render(
        <SortMenu
          options={options}
          value="default"
          onSortChange={onSortChange}
        />
      );
    });

    const select = container.querySelector("select") as HTMLSelectElement;
    await act(async () => {
      fireEvent.change(select, { target: { value: "score-desc" } });
    });

    expect(onSortChange).toHaveBeenCalledWith("score-desc");
  });
});
