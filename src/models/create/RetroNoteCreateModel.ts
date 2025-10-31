export default class RetroNoteCreateModel {
  readonly content: string;
  readonly score: number;
  readonly sectionId: number;
  
  public constructor(content: string, score: number, sectionId: number) {
    this.content = content;
    this.score = score;
    this.sectionId = sectionId;
  }
};
