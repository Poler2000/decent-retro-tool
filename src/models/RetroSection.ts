import type RetroNoteModel from "./RetroNoteModel";

export default interface RetroSection {
  readonly title: string,
  readonly notes: RetroNoteModel[]
  readonly isHidden: boolean
}