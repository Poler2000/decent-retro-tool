import type RetroSection from "./RetroSection"

export default interface RetroModel {
  readonly retroId: number
  readonly title: number
  readonly sections: RetroSection[]
}