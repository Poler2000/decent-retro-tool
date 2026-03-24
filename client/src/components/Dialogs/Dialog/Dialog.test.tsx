import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import Dialog from "./Dialog";

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

describe("<Dialog /> component", () => {
  it("renders children and Backdrop", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <Dialog>
          <div className="test-child">Dialog Content</div>
        </Dialog>
      );
    });

    expect(container.querySelector(".dialog-backdrop")).toBeTruthy();
    expect(container.querySelector(".dialog")).toBeTruthy();
    expect(container.querySelector(".test-child")).toBeTruthy();
    expect(container.querySelector(".test-child")?.textContent).toBe("Dialog Content");
  });

  it("calls onCancel when cancel button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onCancel = vi.fn();

    await act(async () => {
      root.render(<Dialog onCancel={onCancel}>Content</Dialog>);
    });

    const cancelBtn = container.querySelector(".dialog-btn-cancel") as HTMLButtonElement;
    expect(cancelBtn).toBeTruthy();
    expect(cancelBtn.textContent).toBe("Cancel");

    await act(async () => {
      fireEvent.click(cancelBtn);
    });
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onConfirm = vi.fn();

    await act(async () => {
      root.render(<Dialog onConfirm={onConfirm}>Content</Dialog>);
    });

    const confirmBtn = container.querySelector(".dialog-btn-confirm") as HTMLButtonElement;
    expect(confirmBtn).toBeTruthy();
    expect(confirmBtn.textContent).toBe("Confirm");

    await act(async () => {
      fireEvent.click(confirmBtn);
    });
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onCopy when copy button is clicked and manages pulse state", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onCopy = vi.fn();

    await act(async () => {
      root.render(<Dialog onCopy={onCopy}>Content</Dialog>);
    });

    const copyBtn = container.querySelector(".dialog-btn-copy") as HTMLButtonElement;
    expect(copyBtn).toBeTruthy();
    expect(copyBtn.textContent).toBe("Copy");

    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(onCopy).toHaveBeenCalledOnce();
    expect(copyBtn.textContent).toBe("Copied!");
    expect(copyBtn.className).toContain("pulse");
  });

  it("restarts copy animation if clicked again while animating", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onCopy = vi.fn();

    vi.useFakeTimers();

    await act(async () => {
      root.render(<Dialog onCopy={onCopy}>Content</Dialog>);
    });

    const copyBtn = container.querySelector(".dialog-btn-copy") as HTMLButtonElement;

    await act(async () => {
      fireEvent.click(copyBtn);
    });
    expect(copyBtn.textContent).toBe("Copied!");

    // Click again
    await act(async () => {
      fireEvent.click(copyBtn);
    });
    
    // It should briefly set to false and then back to true via setTimeout(..., 0)
    expect(copyBtn.textContent).toBe("Copy");
    
    await act(async () => {
      vi.runAllTimers();
    });
    
    expect(copyBtn.textContent).toBe("Copied!");
    expect(onCopy).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
