import {IPageFlow, PageFlow} from './page-flow.model';
import { UUID } from 'angular2-uuid';

export type IOptionAnswersMap = Map<string, IOptionAnswers>;
export type IOptionAnswersMaps = Map<string, IOptionAnswersMap>;

export interface IOptionAnswers {
  elementId: string;
  id?: string;
  orderNo?: number;
  value?: string;
  pageFlow?: IPageFlow;
  isSaved?: boolean;
}

export class OptionAnswers implements IOptionAnswers {
  constructor(
    public elementId: string,
    public id?: string,
    public orderNo?: number,
    public value?: string,
    public pageFlow?: IPageFlow,
    public isSaved?: boolean,
  ) {
    this.id = id ? id : UUID.UUID();
    this.elementId = elementId ? elementId : '';
    this.orderNo = orderNo ? orderNo : 1;
    this.value = value ? value : '';
    this.pageFlow = pageFlow ? pageFlow : new PageFlow();
    this.isSaved = isSaved ? isSaved : false;
  }
}
