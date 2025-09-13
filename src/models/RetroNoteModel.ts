import type Entity from "./Entity";

export default class RetroNoteModel implements Entity {
  readonly id: number;
  readonly textContent: string;
  readonly score: number;

  constructor(id: number, textContent: string, score: number) {
    this.id = id;
    this.textContent = textContent;
    this.score = score;
  }

  static fromJson(n: any) {
    return new RetroNoteModel(n.id, n.content, n.score);
  }

  getContent(): string {
    return this.textContent;
  }
}