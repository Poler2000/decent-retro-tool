import type { SortOption } from "../sortOptions";
import type Entity from "./Entity";

export default class RetroNoteModel implements Entity {
  readonly id: number;
  readonly content: string;
  readonly score: number;
  readonly sectionId: number;
  readonly creationTime: Date;

  constructor(id: number, textContent: string, score: number, sectionId: number, creationTime: Date) {
    this.id = id;
    this.content = textContent;
    this.score = score;
    this.sectionId = sectionId;
    this.creationTime = creationTime;
  }

  getContent(): string {
    return this.content;
  }

  static getSortOptions(): SortOption[] {
    return ['score-desc', 'score-asc', 'date-desc', 'date-asc', 'name-desc', 'name-asc'];
  }

  static getSortFunction(option?: SortOption) {
    switch (option) {
      case 'score-asc':
        return (a: Entity, b: Entity) => (a as RetroNoteModel).score - (b as RetroNoteModel).score;
      case 'score-desc':
        return (a: Entity, b: Entity) => (b as RetroNoteModel).score - (a as RetroNoteModel).score;
      case 'date-asc':
        return (a: Entity, b: Entity) => (a as RetroNoteModel).creationTime.getTime() - (b as RetroNoteModel).creationTime.getTime();
      case 'date-desc':
        return (a: Entity, b: Entity) => (b as RetroNoteModel).creationTime.getTime() - (a as RetroNoteModel).creationTime.getTime();
      case 'name-asc':
        return (a: Entity, b: Entity) => a.getContent().localeCompare(b.getContent());
      case 'name-desc':
        return (a: Entity, b: Entity) => b.getContent().localeCompare(a.getContent());
    }

    return null;
  }    

  static fromJson(n: any) {
    return new RetroNoteModel(n.id, n.content, n.score, n.sectionId, new Date(n.creationTime));
  }
}