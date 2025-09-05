import type Entity from "./Entity";

export default class TeamModel implements Entity {
  id: number;
  name: string;

  constructor( id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}