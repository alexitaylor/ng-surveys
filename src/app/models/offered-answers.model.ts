import {IPageFlow} from './page-flow.model';

export interface IOfferedAnswers {
  id: number;
  orderNo: number;
  value: string;
  pageFlow: IPageFlow;
}

export class OfferedAnswers implements IOfferedAnswers {
  constructor(
    public id: number,
    public orderNo: number,
    public value: string,
    public pageFlow: IPageFlow,
  ) {}
}
