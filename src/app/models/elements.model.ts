import {IQuestion, Question} from './question.model';
import { UUID } from 'angular2-uuid';

export type IElementsMap = Map<string, IElements>;

export interface IElements {
  id?: string;
  orderNo?: number;
  type?: string;
  pageId?: string;
  question?: IQuestion;
}

export class Elements implements IElements {
  constructor(
    public id?: string,
    public orderNo?: number,
    public type?: string,
    public pageId?: string,
    public question?: IQuestion,
  ) {
    const uuid: string = UUID.UUID();
    const newQuestion = new Question();
    newQuestion.elementId = uuid;

    this.id = id ? id : uuid;
    this.orderNo = orderNo ? orderNo : 1;
    this.type = type ? type : 'question';
    this.pageId = pageId ? pageId : '';
    this.question = question ? question : newQuestion;
  }
}
