import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router";
import NotFound from "./NotFound";

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

describe("<NotFound /> page", () => {
  it("renders 404 message", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      );
    });

    expect(container.textContent).toContain("Ooops");
    expect(container.textContent).toContain("It seems that the page you're looking for does not exists");
  });
});
