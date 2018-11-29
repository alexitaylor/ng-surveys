import {Elements, IElements, IElementsMap} from './elements.model';
import {IPageFlow, PageFlow} from './page-flow.model';
import { UUID } from 'angular2-uuid';

export type IPageMap = Map<string, IPage>;

export interface IPage {
  id?: string;
  orderNo?: number;
  pageFlow?: IPageFlow;
  name?: string;
  description?: string;
  elements?: IElementsMap;
}

export class Page implements IPage {
  constructor(
    public id?: string,
    public orderNo?: number,
    public pageFlow?: IPageFlow,
    public name?: string,
    public description?: string,
    public elements?: IElementsMap,
  ) {
    const newElements = new Elements();
    const elementsMap = new Map<string, IElements>();
    elementsMap.set(newElements.id, newElements);

    this.id = id ? id : UUID.UUID();
    this.orderNo = orderNo ? orderNo : 1;
    this.pageFlow = pageFlow ? pageFlow : new PageFlow();
    this.name = name ? name : '';
    this.description = description ? description : '';
    this.elements = elements ? elements : elementsMap;
  }
}
