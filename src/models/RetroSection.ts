import type RetroNoteModel from "./retroNoteModel";

export default interface RetroSection {
  readonly title: string,
  readonly notes: RetroNoteModel[]
  readonly isHidden: boolean
}