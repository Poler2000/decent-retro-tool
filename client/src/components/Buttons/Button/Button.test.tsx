import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";

import Button from "./Button";
import { highlightMap } from "../../../highlightMap";
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

// a simple color pair that exists in the highlightMap so hover state
// produces a different background colour
const sampleColors: ColorPair = {
  background: "var(--primary-accent-colour)",
  text: "rgb(0, 0, 0)",
};

describe("<Button /> component", () => {
  it("renders children and basic class", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Button colors={sampleColors} onClick={() => {}}>
          Hello
        </Button>,
      );
    });
    const btn = container.querySelector("button") as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.textContent).toBe("Hello");
    expect(btn.className).toContain("button");
  });

  it("appends additionalClass when provided", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Button
          colors={sampleColors}
          onClick={() => {}}
          additionalClass="extra"
        >
          Foo
        </Button>,
      );
    });
    const btn = container.querySelector("button") as HTMLButtonElement;
    expect(btn.className).toContain("button");
    expect(btn.className).toContain("extra");
  });

  it("applies inline styles according to colors prop and hover state", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Button colors={sampleColors} onClick={() => {}}>
          Style
        </Button>,
      );
    });
    const btn = container.querySelector("button") as HTMLButtonElement;

    // initial style
    expect(btn.style.backgroundColor).toBe(sampleColors.background);
    expect(btn.style.borderColor).toBe(sampleColors.text);
    expect(btn.style.color).toBe(sampleColors.text);

    // simulate hover and verify the changed background
    await act(async () => {
      fireEvent.mouseEnter(btn);
    });
    expect(btn.style.backgroundColor).toBe(
      highlightMap[sampleColors.background],
    );

    // leaving should restore original
    await act(async () => {
      fireEvent.mouseLeave(btn);
    });
    expect(btn.style.backgroundColor).toBe(sampleColors.background);
  });

  it("invokes onClick callback when clicked", async () => {
    const onClick = vi.fn();
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    await act(async () => {
      root.render(
        <Button colors={sampleColors} onClick={onClick}>
          Click
        </Button>,
      );
    });
    const btn = container.querySelector("button") as HTMLButtonElement;
    btn.click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
