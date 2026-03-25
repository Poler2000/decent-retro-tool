import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

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

describe("<Dropdown /> component", () => {
  it("renders the button but not children initially", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <Dropdown icon="menu">
          <div className="dropdown-content">Content</div>
        </Dropdown>
      );
    });

    const btn = container.querySelector(".icon-button");
    expect(btn).toBeTruthy();
    expect(btn?.textContent).toBe("menu");
    
    const content = container.querySelector(".dropdown-content");
    expect(content).toBeNull();
  });

  it("toggles children when button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <Dropdown icon="menu">
          <div className="dropdown-content">Content</div>
        </Dropdown>
      );
    });

    const btn = container.querySelector(".icon-button") as HTMLButtonElement;
    
    // Open
    await act(async () => {
      fireEvent.click(btn);
    });
    
    let content = container.querySelector(".dropdown-content");
    expect(content).toBeTruthy();
    expect(content?.textContent).toBe("Content");

    // Close
    await act(async () => {
      fireEvent.click(btn);
    });
    
    content = container.querySelector(".dropdown-content");
    expect(content).toBeNull();
  });
});
