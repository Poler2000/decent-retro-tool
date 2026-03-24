import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { fireEvent } from "@testing-library/react";
import ConfirmationDialog from "./ConfirmationDialog";

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

describe("<ConfirmationDialog /> component", () => {
  it("renders message and buttons", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const message = "Are you sure?";

    await act(async () => {
      root.render(
        <ConfirmationDialog
          message={message}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      );
    });

    expect(container.querySelector(".dialog-msg")?.textContent).toBe(message);
    
    const confirmBtn = container.querySelector(".dialog-btn-confirm") as HTMLButtonElement;
    const cancelBtn = container.querySelector(".dialog-btn-cancel") as HTMLButtonElement;

    expect(confirmBtn).toBeTruthy();
    expect(cancelBtn).toBeTruthy();

    await act(async () => {
      fireEvent.click(confirmBtn);
    });
    expect(onConfirm).toHaveBeenCalledOnce();

    await act(async () => {
      fireEvent.click(cancelBtn);
    });
    expect(onCancel).toHaveBeenCalledOnce();
  });
});
