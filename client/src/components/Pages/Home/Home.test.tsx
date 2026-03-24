import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { MemoryRouter } from "react-router";
import Home from "./Home";
import * as teamClient from "../../../api/teamClient";
import TeamModel from "../../../models/TeamModel";
import { fireEvent } from "@testing-library/react";

// Mock the teamClient
vi.mock("../../../api/teamClient", () => ({
  getTeams: vi.fn(),
  createTeam: vi.fn(),
  deleteTeam: vi.fn(),
  updateTeam: vi.fn(),
}));

// Mock dnd-kit as it can be problematic in jsdom
vi.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }: any) => <div>{children}</div>,
  useSensor: vi.fn(),
  useSensors: vi.fn(),
  PointerSensor: vi.fn(),
  closestCenter: vi.fn(),
}));

vi.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: any) => <div>{children}</div>,
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    transition: null,
  }),
  rectSortingStrategy: {},
  arrayMove: vi.fn(),
}));

let container: HTMLElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  vi.clearAllMocks();
});

afterEach(() => {
  if (container) {
    document.body.removeChild(container);
    container = null;
  }
});

describe("<Home /> page", () => {
  const mockTeams = [
    new TeamModel(1, "Team 1"),
    new TeamModel(2, "Team 2"),
  ];

  it("renders Header and teams from API", async () => {
    vi.mocked(teamClient.getTeams).mockResolvedValue(mockTeams);

    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    // Verify API call
    expect(teamClient.getTeams).toHaveBeenCalled();

    // Verify Header logo (it's in Header)
    const logo = container.querySelector(".logo");
    expect(logo).toBeTruthy();

    // Verify teams are rendered as LinkCards
    const teamLinks = container.querySelectorAll(".card-link");
    expect(teamLinks.length).toBe(2);
    expect(teamLinks[0].textContent).toBe("Team 1");
    expect(teamLinks[1].textContent).toBe("Team 2");
  });

  it("calls createTeam when AddCard is clicked", async () => {
    vi.mocked(teamClient.getTeams).mockResolvedValue([]);
    vi.mocked(teamClient.createTeam).mockResolvedValue(undefined);

    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    const addBtn = container.querySelector(".add-button") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(addBtn);
    });

    expect(teamClient.createTeam).toHaveBeenCalledWith(expect.objectContaining({
      name: "New Team"
    }));
    // It should reload teams after creation
    expect(teamClient.getTeams).toHaveBeenCalledTimes(2);
  });

  it("shows confirmation dialog and calls deleteTeam when delete is clicked", async () => {
    vi.mocked(teamClient.getTeams).mockResolvedValue(mockTeams);
    vi.mocked(teamClient.deleteTeam).mockResolvedValue(undefined);

    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    const deleteBtns = container.querySelectorAll(".remove-button");
    await act(async () => {
      fireEvent.click(deleteBtns[0]);
    });

    // Check if dialog is shown
    expect(container.textContent).toContain("Are you sure to delete the team: Team 1?");

    const confirmBtn = container.querySelector(".dialog-btn-confirm") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(confirmBtn);
    });

    expect(teamClient.deleteTeam).toHaveBeenCalledWith(1);
    expect(teamClient.getTeams).toHaveBeenCalledTimes(2);
    // Dialog should be gone
    expect(container.textContent).not.toContain("Are you sure to delete the team: Team 1?");
  });
});
