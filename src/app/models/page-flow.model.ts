export interface IPageFlow {
  nextPage?: boolean;
  label?: string;
  pageId?: string;
}

export class PageFlow implements IPageFlow {
  constructor(
    public nextPage?: boolean,
    public label?: string,
    public pageId?: string,
  ) {
    this.nextPage = nextPage ? nextPage : true;
    this.label = label ? label : 'pageFlow.goToNextPage';
    this.pageId = pageId ? pageId : '';
  }
}
