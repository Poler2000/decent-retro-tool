import type Entity from "./models/Entity";
import type RetroNoteModel from "./models/RetroNoteModel";

export type SortOption = 'score-desc' | 'score-asc' | 'date-desc' | 'date-asc' | 'name-desc' | 'name-asc';

export const getSortFunction = (option?: SortOption) => {
  switch (option) {
    case 'score-asc':
      return (a: Entity, b: Entity) => (b as RetroNoteModel).score - (a as RetroNoteModel).score;
    case 'score-desc':
      return (a: Entity, b: Entity) => (a as RetroNoteModel).score - (b as RetroNoteModel).score;
    // case 'date-asc':
    //   return (a: Entity, b: Entity) => new Date(a.).getTime() - new Date(b.createdAt).getTime();
    // case 'date-desc':
    //   return (a: Entity, b: Entity) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    case 'name-asc':
      return (a: Entity, b: Entity) => a.getContent().localeCompare(b.getContent());
    case 'name-desc':
      return (a: Entity, b: Entity) => b.getContent().localeCompare(a.getContent());
  }

  return null;
}    