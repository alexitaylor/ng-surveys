import {IPageFlow, PageFlow} from './page-flow.model';
import { UUID } from 'angular2-uuid';

export type IOptionAnswersMap = Map<string, IOptionAnswers>;

export interface IOptionAnswers {
  id?: string;
  orderNo?: number;
  value?: string;
  pageFlow?: IPageFlow;
}

export class OptionAnswers implements IOptionAnswers {
  constructor(
    public id?: string,
    public orderNo?: number,
    public value?: string,
    public pageFlow?: IPageFlow,
  ) {
    this.id = id ? id : UUID.UUID();
    this.orderNo = orderNo ? orderNo : 1;
    this.value = value ? value : '';
    this.pageFlow = pageFlow ? pageFlow : new PageFlow();
  }
}
