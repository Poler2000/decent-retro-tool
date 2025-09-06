import type Entity from "./Entity";
import type RetroNoteModel from "./RetroNoteModel";

export default class RetroSection implements Entity {
  readonly id: number;
  readonly name: string;
  readonly notes: RetroNoteModel[];
  readonly isHidden: boolean;

  constructor(id: number, name: string, notes: RetroNoteModel[], isHidden: boolean) {
    this.id = id;
    this.name = name;
    this.notes = notes;
    this.isHidden = isHidden
  }
}