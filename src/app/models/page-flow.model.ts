import {IPage} from './page.model';

export interface IPageFlow {
  nextPage: boolean;
  label: string;
  page?: IPage;
}

export class PageFlow implements IPageFlow {
  constructor(
    public nextPage: boolean,
    public label: string,
    public page?: IPage,
  ) {}
}
