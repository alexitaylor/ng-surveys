export interface IPage {
  id: number;
  number: number;
}

export class Page implements IPage {
  constructor(
    public id: number,
    public number: number,
  ) {}
}
