import type Entity from "./Entity"
import type RetroSection from "./RetroSection"

export default class RetroModel implements Entity {
  readonly id: number;
  readonly name: string;
  readonly sections: RetroSection[];
  readonly teamId: number;

  constructor(id: number, name: string, sections: RetroSection[], teamId: number) {
  this.id = id;
  this.name = name;
  this.sections = sections;
  this.teamId = teamId;
  }
}