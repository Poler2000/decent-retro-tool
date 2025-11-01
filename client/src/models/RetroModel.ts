import type { SortOption } from "../sortOptions";
import type Entity from "./Entity"
import RetroSectionModel from "./RetroSection"

export default class RetroModel implements Entity {
  readonly id: number;
  readonly title: string;
  readonly sections: RetroSectionModel[];
  readonly teamId: number;
  readonly creationTime: Date;

  constructor(id: number, title: string, sections: RetroSectionModel[], teamId: number, creationTime: Date) {
    this.id = id;
    this.title = title;
    this.sections = sections;
    this.teamId = teamId;
    this.creationTime = creationTime;
  }

  getContent(): string {
    return this.title;
  };

  static getSortOptions(): SortOption[] {
    return ['date-desc', 'date-asc', 'name-desc', 'name-asc'];
  }

  static getSortFunction(option?: SortOption) {
    switch (option) {
      case 'date-asc':
        return (a: Entity, b: Entity) => (a as RetroModel).creationTime.getTime() - (b as RetroModel).creationTime.getTime();
      case 'date-desc':
        return (a: Entity, b: Entity) => (b as RetroModel).creationTime.getTime() - (a as RetroModel).creationTime.getTime();
      case 'name-asc':
        return (a: Entity, b: Entity) => a.getContent().localeCompare(b.getContent());
      case 'name-desc':
        return (a: Entity, b: Entity) => b.getContent().localeCompare(a.getContent());
    }

    return null;
  }    

  static fromJson(json: any): RetroModel {
    return new RetroModel(json.id, json.title, json.sections?.map((s: any) => RetroSectionModel.fromJson(s)) ?? [], json.teamId,  new Date(json.creationTime));
  }
}