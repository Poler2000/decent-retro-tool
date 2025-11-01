import type Entity from "./Entity";
import RetroNoteModel from "./RetroNoteModel";

export default class RetroSectionModel implements Entity {
  readonly id: number;
  readonly title: string;
  readonly notes: RetroNoteModel[];
  readonly isHidden: boolean;
  readonly retroId?: number;

  constructor(id: number, title: string, notes: RetroNoteModel[], isHidden: boolean, retroId: number) {
    this.id = id;
    this.title = title;
    this.notes = notes;
    this.isHidden = isHidden
    this.retroId = retroId;
  }

  static fromJson(json: any): RetroSectionModel {
    return new RetroSectionModel(json.id, json.title, json.notes.map((n: any) => RetroNoteModel.fromJson(n)), json.isHidden, json.retroId);
  }

  getContent(): string {
    return this.title;
  }
}