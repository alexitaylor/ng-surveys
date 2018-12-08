import {IPageFlow, PageFlow} from './page-flow.model';
import { UUID } from 'angular2-uuid';

export type IPageMap = Map<string, IPage>;
export type IPageMapMap = Map<string, IPageMap>;

export interface IPage {
  id: string;
  surveyId: string;
  orderNo?: number;
  pageFlow?: IPageFlow;
  name?: string;
  description?: string;
}

export class Page implements IPage {
  constructor(
    public id: string,
    public surveyId: string,
    public orderNo?: number,
    public pageFlow?: IPageFlow,
    public name?: string,
    public description?: string,
  ) {
    this.orderNo = orderNo ? orderNo : 1;
    this.pageFlow = pageFlow ? pageFlow : new PageFlow();
    this.name = name ? name : '';
    this.description = description ? description : '';
  }
}
