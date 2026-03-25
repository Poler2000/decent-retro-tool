import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import MarkdownDialog from "./MarkdownDialog";

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

describe("<MarkdownDialog /> component", () => {
  it("renders the message as markdown", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const message = "# Hello World\nThis is a test.";

    await act(async () => {
      root.render(
        <MarkdownDialog
          message={message}
          onCancel={vi.fn()}
          onCopy={vi.fn()}
        />
      );
    });

    expect(container.querySelector("h1")?.textContent).toBe("Hello World");
    expect(container.querySelector("p")?.textContent).toBe("This is a test.");
  });

  it("calls onCancel when cancel button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onCancel = vi.fn();

    await act(async () => {
      root.render(
        <MarkdownDialog
          message="test"
          onCancel={onCancel}
          onCopy={vi.fn()}
        />
      );
    });

    const cancelBtn = container.querySelector(".dialog-btn-cancel") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(cancelBtn);
    });

    expect(onCancel).toHaveBeenCalled();
  });

  it("calls onCopy when copy button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onCopy = vi.fn();

    await act(async () => {
      root.render(
        <MarkdownDialog
          message="test"
          onCancel={vi.fn()}
          onCopy={onCopy}
        />
      );
    });

    const copyBtn = container.querySelector(".dialog-btn-copy") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(onCopy).toHaveBeenCalled();
  });
});
