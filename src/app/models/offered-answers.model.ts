import {IPageFlow, PageFlow} from './page-flow.model';
import { UUID } from 'angular2-uuid';

export type IOfferedAnswersMap = Map<string, IOfferedAnswers>;

export interface IOfferedAnswers {
  id?: string;
  orderNo?: number;
  value?: string;
  pageFlow?: IPageFlow;
}

export class OfferedAnswers implements IOfferedAnswers {
  constructor(
    public id?: string,
    public orderNo?: number,
    public value?: string,
    public pageFlow?: IPageFlow,
  ) {
    this.id = id ? id : UUID.UUID();
    this.orderNo = orderNo ? orderNo : null;
    this.value = value ? value : '';
    this.pageFlow = pageFlow ? pageFlow : new PageFlow();
  }
}
