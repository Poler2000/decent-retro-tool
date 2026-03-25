import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createRoot, type Root } from "react-dom/client";
import { act } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import Retro from "./Retro";
import * as teamClient from "../../../api/teamClient";
import * as retroClient from "../../../api/retroClient";
import * as noteClient from "../../../api/noteClient";
import TeamModel from "../../../models/TeamModel";
import RetroModel from "../../../models/RetroModel";
import RetroSectionModel from "../../../models/RetroSection";
import RetroNoteModel from "../../../models/RetroNoteModel";
import { fireEvent } from "@testing-library/react";

// Mock the clients
vi.mock("../../../api/teamClient", () => ({
  getTeam: vi.fn(),
}));

vi.mock("../../../api/retroClient", () => ({
  getRetro: vi.fn(),
  updateRetro: vi.fn(),
  downloadRetro: vi.fn(),
  getRetroMarkdown: vi.fn(),
}));

vi.mock("../../../api/noteClient", () => ({
  createNote: vi.fn(),
  deleteNote: vi.fn(),
  updateNote: vi.fn(),
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

describe("<Retro /> page", () => {
  const teamId = 1;
  const retroId = 2;
  const mockTeam = new TeamModel(teamId, "Test Team");
  const mockNotes = [
    new RetroNoteModel(101, "Note 1", 5, 1, new Date()),
  ];
  const mockSections = [
    new RetroSectionModel(1, "What went well", mockNotes, false, retroId),
    new RetroSectionModel(2, "What could be improved", [], false, retroId),
  ];
  const mockRetro = new RetroModel(retroId, "Sprint Retro", mockSections, teamId, new Date());

  it("renders retro title, sections and notes", async () => {
    vi.mocked(teamClient.getTeam).mockResolvedValue(mockTeam);
    vi.mocked(retroClient.getRetro).mockResolvedValue(mockRetro);

    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={[`/teams/${teamId}/retro/${retroId}`]}>
          <Routes>
            <Route path="/teams/:teamId/retro/:retroId" element={<Retro />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(retroClient.getRetro).toHaveBeenCalledWith(retroId);
    
    // Check for sections
    expect(container.textContent).toContain("What went well");
    expect(container.textContent).toContain("What could be improved");

    // Check for note
    expect(container.textContent).toContain("Note 1");
    expect(container.textContent).toContain("5"); // score
  });

  it("calls createNote when AddCard is clicked in a section", async () => {
    vi.mocked(teamClient.getTeam).mockResolvedValue(mockTeam);
    vi.mocked(retroClient.getRetro).mockResolvedValue(mockRetro);
    vi.mocked(noteClient.createNote).mockResolvedValue(undefined as any);

    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={[`/teams/${teamId}/retro/${retroId}`]}>
          <Routes>
            <Route path="/teams/:teamId/retro/:retroId" element={<Retro />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const addBtns = container.querySelectorAll(".add-button");
    // Click add button in first section
    await act(async () => {
      fireEvent.click(addBtns[1]);
    });

    expect(noteClient.createNote).toHaveBeenCalledWith(expect.objectContaining({
      sectionId: 2,
      score: 1,
      content: ""
    }));
    expect(retroClient.getRetro).toHaveBeenCalledTimes(2);
  });

  it("calls deleteNote when delete is clicked on a RetroCard", async () => {
    vi.mocked(teamClient.getTeam).mockResolvedValue(mockTeam);
    vi.mocked(retroClient.getRetro).mockResolvedValue(mockRetro);
    vi.mocked(noteClient.deleteNote).mockResolvedValue(undefined as any);

    if (!container) throw new Error("container not set");
    const root: Root = createRoot(container);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={[`/teams/${teamId}/retro/${retroId}`]}>
          <Routes>
            <Route path="/teams/:teamId/retro/:retroId" element={<Retro />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const deleteBtn = container.querySelector(".remove-button") as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(deleteBtn);
    });

    expect(noteClient.deleteNote).toHaveBeenCalledWith(101);
    expect(retroClient.getRetro).toHaveBeenCalledTimes(2);
  });
});
