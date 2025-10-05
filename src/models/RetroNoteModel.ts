import type Entity from "./Entity";

export default class RetroNoteModel implements Entity {
  readonly id: number;
  readonly content: string;
  readonly score: number;
  readonly sectionId: number;

  constructor(id: number, textContent: string, score: number, sectionId: number) {
    this.id = id;
    this.content = textContent;
    this.score = score;
    this.sectionId = sectionId;
  }

  static fromJson(n: any) {
    return new RetroNoteModel(n.id, n.content, n.score, n.sectionId);
  }

  getContent(): string {
    return this.content;
  }
}