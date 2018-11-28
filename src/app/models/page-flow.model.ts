import {IPage} from './page.model';

export interface IPageFlow {
  nextPage?: boolean;
  label?: string;
  page?: IPage;
}

export class PageFlow implements IPageFlow {
  constructor(
    public nextPage?: boolean,
    public label?: string,
    public page?: IPage,
  ) {
    this.nextPage = nextPage ? nextPage : true;
    this.label = label ? label : 'pageFlow.goToNextPage';
    this.page = page ? page : null;
  }
}
