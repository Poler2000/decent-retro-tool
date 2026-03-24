import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router";
import { fireEvent } from "@testing-library/react";
import Header from "./Header";

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

describe("<Header /> component", () => {
  it("renders the logo with a link to /home", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Header />
        </MemoryRouter>
      );
    });

    const logoLink = container.querySelector(".logo-container a") as HTMLAnchorElement;
    expect(logoLink).toBeTruthy();
    expect(logoLink.getAttribute("href")).toBe("/home");
    
    const logoImg = logoLink.querySelector("img") as HTMLImageElement;
    expect(logoImg).toBeTruthy();
    expect(logoImg.getAttribute("alt")).toBe("Decent Retro Tool logo");
  });

  it("renders breadcrumbs when provided", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const breadcrumbs = [
      { link: "/home", text: "Home" },
      { link: "/teams/1", text: "Team 1" },
    ];
    const onEntityRename = vi.fn();

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Header breadcrumbs={breadcrumbs} onEntityRename={onEntityRename} />
        </MemoryRouter>
      );
    });

    const breadcrumbContainer = container.querySelector(".breadcrumbs");
    expect(breadcrumbContainer).toBeTruthy();
    expect(breadcrumbContainer?.textContent).toContain("Home");
    expect(breadcrumbContainer?.textContent).toContain("Team 1");
  });

  it("calls onEdit when edit icon button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onEdit = vi.fn();

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Header onEdit={onEdit} />
        </MemoryRouter>
      );
    });

    const editBtn = Array.from(container.querySelectorAll(".icon-button")).find(
      (btn) => btn.textContent === "edit"
    ) as HTMLButtonElement;
    
    expect(editBtn).toBeTruthy();
    
    await act(async () => {
      fireEvent.click(editBtn);
    });

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("calls onMarkdown when markdown icon button is clicked", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const onMarkdown = vi.fn();

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Header onMarkdown={onMarkdown} />
        </MemoryRouter>
      );
    });

    const markdownBtn = Array.from(container.querySelectorAll(".icon-button")).find(
      (btn) => btn.textContent === "markdown"
    ) as HTMLButtonElement;
    
    expect(markdownBtn).toBeTruthy();
    
    await act(async () => {
      fireEvent.click(markdownBtn);
    });

    expect(onMarkdown).toHaveBeenCalledTimes(1);
  });

  it("renders SortMenu when sortConfig is provided", async () => {
    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);
    const sortConfig = {
      options: ["default", "score-desc"] as any,
      value: "default" as any,
      onSortChange: vi.fn(),
    };

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <Header sortConfig={sortConfig} />
        </MemoryRouter>
      );
    });

    const sortMenu = container.querySelector(".sort-options");
    expect(sortMenu).toBeTruthy();
  });
});
