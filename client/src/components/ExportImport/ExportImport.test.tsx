import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import ExportImport from "./ExportImport";

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

describe("<ExportImport /> component", () => {
  it("renders export button if onExport is provided", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onExport = vi.fn();

    await act(async () => {
      root.render(<ExportImport onExport={onExport} />);
    });

    const exportBtn = Array.from(container.querySelectorAll(".icon-button")).find(
      btn => btn.textContent === "download"
    );
    expect(exportBtn).toBeTruthy();
    
    await act(async () => {
      fireEvent.click(exportBtn as HTMLButtonElement);
    });
    expect(onExport).toHaveBeenCalledTimes(1);
  });

  it("renders import button if onImport is provided", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onImport = vi.fn();

    await act(async () => {
      root.render(<ExportImport onImport={onImport} />);
    });

    const importBtn = Array.from(container.querySelectorAll(".icon-button")).find(
      btn => btn.textContent === "upload"
    );
    expect(importBtn).toBeTruthy();
    
    await act(async () => {
      fireEvent.click(importBtn as HTMLButtonElement);
    });
    expect(onImport).toHaveBeenCalledTimes(1);
  });

  it("renders both buttons if both handlers are provided", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<ExportImport onExport={vi.fn()} onImport={vi.fn()} />);
    });

    const buttons = container.querySelectorAll(".icon-button");
    expect(buttons.length).toBe(2);
  });
});
