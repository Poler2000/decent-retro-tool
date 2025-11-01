import type SectionUpdateModel from "./SectionUpdateModel";

export default class RetroUpdateModel {
  readonly title: string;
  readonly sections: SectionUpdateModel[];

  public constructor(title: string, sections: SectionUpdateModel[]) {
    this.title = title;
    this.sections = sections;
  }
};