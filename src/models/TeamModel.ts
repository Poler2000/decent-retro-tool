import type Entity from "./Entity";

export default class TeamModel implements Entity {
  readonly id: number;
  readonly name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static fromJson(json: any): TeamModel {
    return new TeamModel(json.id, json.name);
  }

  getContent = () : string => {
    return this.name;
  };
}