import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

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

describe("<ThemeSwitcher /> component", () => {
  it("renders all theme options", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<ThemeSwitcher />);
    });

    const options = container.querySelectorAll(".theme-option");
    expect(options.length).toBe(3);
    expect(container.querySelector("#theme-light")).toBeTruthy();
    expect(container.querySelector("#theme-dark")).toBeTruthy();
    expect(container.querySelector("#theme-sunset")).toBeTruthy();
  });
});
