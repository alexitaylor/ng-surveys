import {IQuestion, Question} from './question.model';
import { UUID } from 'angular2-uuid';

export type IElementsMap = Map<string, IElements>;

export interface IElements {
  id?: string;
  orderNo?: number;
  type?: string;
  question?: IQuestion;
}

export class Elements implements IElements {
  constructor(
    public id?: string,
    public orderNo?: number,
    public type?: string,
    public question?: IQuestion,
  ) {
    this.id = id ? id : UUID.UUID();
    this.orderNo = orderNo ? orderNo : null;
    this.type = type ? type : 'question';
    this.question = question ? question : new Question();
  }
}
