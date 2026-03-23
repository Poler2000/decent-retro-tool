import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router";
import { fireEvent } from "@testing-library/react";
import Breadcrumbs, { type BreadcrumbFragment } from "./Breadcrumbs";

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

describe("<Breadcrumbs /> component", () => {
  const parts: BreadcrumbFragment[] = [
    { link: "/", text: "Home" },
    { link: "/retro", text: "Retros" },
    { link: "/retro/1", text: "Sprint 1" },
  ];

  it("renders breadcrumb parts as links", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onEdit = vi.fn();

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Breadcrumbs parts={parts} onEdit={onEdit} />
        </MemoryRouter>
      );
    });

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(3);
    expect(links[0].textContent).toBe("Home");
    expect(links[0].getAttribute("href")).toBe("/");
    expect(links[1].textContent).toBe("Retros");
    expect(links[1].getAttribute("href")).toBe("/retro");
    expect(links[2].textContent).toBe("Sprint 1");
    expect(links[2].getAttribute("href")).toBe("/retro/1");
  });

  it("switches to input for the last part when edit button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onEdit = vi.fn();

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Breadcrumbs parts={parts} onEdit={onEdit} />
        </MemoryRouter>
      );
    });

    const editBtn = container.querySelector(".title-edit-button") as HTMLButtonElement;
    expect(editBtn).toBeTruthy();

    await act(async () => {
      fireEvent.click(editBtn);
    });

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe("Sprint 1");
    expect(input.className).toBe("breadcrumb-title-input");

    const remainingLinks = container.querySelectorAll("a");
    expect(remainingLinks.length).toBe(2);
    expect(remainingLinks[0].textContent).toBe("Home");
    expect(remainingLinks[1].textContent).toBe("Retros");
  });

  it("calls onEdit when editing is done", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onEdit = vi.fn();

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Breadcrumbs parts={parts} onEdit={onEdit} />
        </MemoryRouter>
      );
    });

    const editBtn = container.querySelector(".title-edit-button") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(editBtn);
    });

    const input = container.querySelector("input") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: "New Sprint Title" } });
      fireEvent.blur(input);
    });

    expect(onEdit).toHaveBeenCalledWith("New Sprint Title");

    // Wait for the switch back to non-editing mode
    expect(container.querySelector("input")).toBeNull();

    // Should switch back to non-editing mode
    const links = container.querySelectorAll("a");
    expect(links.length).toBe(3);
  });
});
