import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";

import IconButton from "./IconButton";
import type { ColorPair } from "../../../Colour";

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

const sampleColors: ColorPair = {
  background: "rgb(255, 255, 255)",
  text: "rgb(0, 0, 0)",
};

describe("<IconButton /> component", () => {
  it("renders with given icon", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <IconButton
          icon="home"
          colors={sampleColors}
          onClick={() => {}}
        />
      );
    });
    const span = container.querySelector("span");
    expect(span).toBeTruthy();
    expect(span!.textContent).toBe("home");
    expect(span!.className).toContain("material-symbols-outlined");
  });

  it("applies iconSize style when provided", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <IconButton
          icon="settings"
          colors={sampleColors}
          iconSize="24px"
          onClick={() => {}}
        />
      );
    });
    const span = container.querySelector("span");
    expect(span!.style.fontSize).toBe("24px");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <IconButton
          icon="add"
          colors={sampleColors}
          onClick={onClick}
        />
      );
    });
    const button = container.querySelector("button");
    await act(async () => {
      button!.click();
    });
    expect(onClick).toHaveBeenCalledOnce();
  });
});
