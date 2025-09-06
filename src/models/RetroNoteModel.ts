import type Entity from "./Entity";

export default class RetroNoteModel implements Entity {
  readonly id: number;
  readonly name: string;
  readonly score: number;

  constructor(id: number, name: string, score: number) {
    this.id = id;
    this.name = name;
    this.score = score;
  }
}