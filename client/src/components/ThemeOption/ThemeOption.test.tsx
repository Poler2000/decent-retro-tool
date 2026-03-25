import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import ThemeOption from "./ThemeOption";

let container: HTMLElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  localStorage.clear();
  document.body.removeAttribute("data-theme");
});

afterEach(() => {
  if (container) {
    document.body.removeChild(container);
    container = null;
  }
});

describe("<ThemeOption /> component", () => {
  it("renders correctly", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<ThemeOption theme="dark" />);
    });

    const option = container.querySelector(".theme-option");
    expect(option).toBeTruthy();
    expect(option?.id).toBe("theme-dark");
  });

  it("sets body attribute and localStorage on click", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(<ThemeOption theme="sunset" />);
    });

    const option = container.querySelector(".theme-option") as HTMLDivElement;
    await act(async () => {
      fireEvent.click(option);
    });

    expect(document.body.getAttribute("data-theme")).toBe("sunset");
    expect(localStorage.getItem("theme")).toBe("sunset");
  });
});
