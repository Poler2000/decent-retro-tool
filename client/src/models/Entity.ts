export default interface Entity {
  readonly id: number,
  getContent(): string,
}