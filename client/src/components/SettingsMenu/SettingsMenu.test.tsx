import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import SettingsMenu from "./SettingsMenu";

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

describe("<SettingsMenu /> component", () => {
  it("renders correctly and can be opened", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<SettingsMenu />);
    });

    const btn = container.querySelector(".icon-button") as HTMLButtonElement;
    expect(btn).toBeTruthy();
    
    // Open dropdown
    await act(async () => {
      fireEvent.click(btn);
    });
    
    expect(container.textContent).toContain("Github");
    expect(container.querySelector("a")?.getAttribute("href")).toContain("https://github.com/");
  });

  it("renders ExportImport when handlers are provided", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<SettingsMenu onExport={vi.fn()} />);
    });

    const btn = container.querySelector(".icon-button") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(btn);
    });
    
    expect(container.querySelector(".export-import-container")).toBeTruthy();
  });
});
