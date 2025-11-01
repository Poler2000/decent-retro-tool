export default class RetroCreateModel {
  readonly title: string;
  readonly teamId: number;

  public constructor(title: string, teamId: number) {
    this.title = title;
    this.teamId = teamId;
  }
};