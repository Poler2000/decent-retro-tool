import type Entity from "./Entity";

export default class TeamModel implements Entity {
  readonly id: number;
  readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}