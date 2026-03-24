import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import Team from "./Team";
import * as teamClient from "../../../api/teamClient";
import * as retroClient from "../../../api/retroClient";
import TeamModel from "../../../models/TeamModel";
import RetroModel from "../../../models/RetroModel";
import { fireEvent } from "@testing-library/react";

// Mock the clients
vi.mock("../../../api/teamClient", () => ({
  getTeam: vi.fn(),
  updateTeam: vi.fn(),
}));

vi.mock("../../../api/retroClient", () => ({
  getRetros: vi.fn(),
  createRetro: vi.fn(),
  deleteRetro: vi.fn(),
  updateRetro: vi.fn(),
}));

// Mock dnd-kit
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

describe("<Team /> page", () => {
  const teamId = 123;
  const mockTeam = new TeamModel(teamId, "Awesome Team");
  const mockRetros = [
    new RetroModel(1, "Retro 1", [], teamId, new Date()),
    new RetroModel(2, "Retro 2", [], teamId, new Date()),
  ];

  it("renders team name in breadcrumbs and retros as LinkCards", async () => {
    vi.mocked(teamClient.getTeam).mockResolvedValue(mockTeam);
    vi.mocked(retroClient.getRetros).mockResolvedValue(mockRetros);

    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={[`/teams/${teamId}`]}>
          <Routes>
            <Route path="/teams/:teamId" element={<Team />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(teamClient.getTeam).toHaveBeenCalledWith(teamId);
    expect(retroClient.getRetros).toHaveBeenCalledWith(teamId);

    // Breadcrumbs should show team name
    expect(container.textContent).toContain("Awesome Team");

    // Retros should be rendered
    const retroLinks = container.querySelectorAll(".card-link");
    expect(retroLinks.length).toBe(2);
    expect(retroLinks[0].textContent).toBe("Retro 1");
    expect(retroLinks[1].textContent).toBe("Retro 2");
  });

  it("calls createRetro when AddCard is clicked", async () => {
    vi.mocked(teamClient.getTeam).mockResolvedValue(mockTeam);
    vi.mocked(retroClient.getRetros).mockResolvedValue([]);
    vi.mocked(retroClient.createRetro).mockResolvedValue(undefined);

    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={[`/teams/${teamId}`]}>
          <Routes>
            <Route path="/teams/:teamId" element={<Team />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const addBtn = container.querySelector(".add-button") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(addBtn);
    });

    expect(retroClient.createRetro).toHaveBeenCalledWith(expect.objectContaining({
      title: "New Retro",
      teamId: teamId
    }));
    expect(retroClient.getRetros).toHaveBeenCalledTimes(2);
  });
});
