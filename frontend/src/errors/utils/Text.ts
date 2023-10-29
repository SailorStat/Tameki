export default class Text {
  public readonly lines: string[] = [];

  public constructor(...lines: string[]) {
    this.lines = lines;
  }

  public addLine = (line: string): void => {
    this.lines.push(line);
  };

  public toString = (): string => this.lines.join(". ");
}
