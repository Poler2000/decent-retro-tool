import type RetroNoteCreateModel from "../create/RetroNoteCreateModel";

export default class SectionUpdateModel {
  readonly id: number;
  readonly title: string;
  readonly isHidden: boolean;
  readonly notes: RetroNoteCreateModel[];

  public constructor(id: number, title: string, isHidden: boolean, notes: RetroNoteCreateModel[]) {
    this.id = id;
    this.title = title;
    this.isHidden = isHidden;
    this.notes = notes;
  }
}