import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import SectionConfigDialog from "./SectionConfigDialog";
import RetroSectionModel from "../../../../models/RetroSection";

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

describe("<SectionConfigDialog /> component", () => {
  const retroSections = [
    new RetroSectionModel(1, "What went well", [], false, 1),
    new RetroSectionModel(2, "What could be improved", [], false, 1),
  ];

  it("renders correctly with sections", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <SectionConfigDialog
          retroId={1}
          retroSections={retroSections}
          onConfirm={vi.fn()}
          onCancel={vi.fn()}
        />
      );
    });

    const items = container.querySelectorAll(".section-config-item");
    expect(items.length).toBe(2);
    expect(container.textContent).toContain("Sections");
  });

  it("calls onConfirm with updated sections when confirm button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onConfirm = vi.fn();

    await act(async () => {
      root.render(
        <SectionConfigDialog
          retroId={1}
          retroSections={retroSections}
          onConfirm={onConfirm}
          onCancel={vi.fn()}
        />
      );
    });

    // Toggle the first section (hide it)
    const firstCheckbox = container.querySelector(".section-checkbox") as HTMLInputElement;
    await act(async () => {
      fireEvent.click(firstCheckbox);
    });

    const confirmBtn = container.querySelector(".dialog-btn-confirm") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(confirmBtn);
    });

    expect(onConfirm).toHaveBeenCalled();
    const updatedSections = onConfirm.mock.calls[0][0] as RetroSectionModel[];
    expect(updatedSections[0].isHidden).toBe(true);
    expect(updatedSections[1].isHidden).toBe(false);
  });

  it("adds a section when Counter plus button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <SectionConfigDialog
          retroId={1}
          retroSections={retroSections}
          onConfirm={vi.fn()}
          onCancel={vi.fn()}
        />
      );
    });

    const plusBtn = Array.from(container.querySelectorAll(".icon-button")).find(
      btn => btn.textContent === "add"
    ) as HTMLButtonElement;
    
    await act(async () => {
      fireEvent.click(plusBtn);
    });

    const items = container.querySelectorAll(".section-config-item");
    expect(items.length).toBe(3);
  });
});
