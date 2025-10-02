import type Entity from "./Entity"
import RetroSectionModel from "./RetroSection"

export default class RetroModel implements Entity {
  readonly id: number;
  readonly title: string;
  readonly sections: RetroSectionModel[];
  readonly teamId: number;

  constructor(id: number, title: string, sections: RetroSectionModel[], teamId: number) {
  this.id = id;
  this.title = title;
  this.sections = sections;
  this.teamId = teamId;
  }

  static fromJson(json: any): RetroModel {
    console.log(json);
    return new RetroModel(json.id, json.title, json.sections?.map((s: any) => RetroSectionModel.fromJson(s)) ?? [], json.teamId);
  }

  getContent(): string {
    return this.title;
  };
}