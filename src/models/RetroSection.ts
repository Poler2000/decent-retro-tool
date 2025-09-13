import type Entity from "./Entity";
import RetroNoteModel from "./RetroNoteModel";

export default class RetroSectionModel implements Entity {
  readonly id: number;
  readonly title: string;
  readonly notes: RetroNoteModel[];
  readonly isHidden: boolean;

  constructor(id: number, title: string, notes: RetroNoteModel[], isHidden: boolean) {
    this.id = id;
    this.title = title;
    this.notes = notes;
    this.isHidden = isHidden
  }

  static fromJson(json: any): RetroSectionModel {
    return new RetroSectionModel(json.id, json.title, json.notes.map((n: any) => RetroNoteModel.fromJson(n)), json.isHidden);
  }

  getContent(): string {
    return this.title;
  }
}