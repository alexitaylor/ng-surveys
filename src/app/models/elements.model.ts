import {IQuestion, Question} from './question.model';
import { UUID } from 'angular2-uuid';
import {IParagraph} from './paragraph.model';

export type IElementsMap = Map<string, IElements>;
export type IElementsMapMap = Map<string, IElementsMap>;

export interface IElements {
  pageId: string;
  id?: string;
  orderNo?: number;
  type?: string;
  question?: IQuestion;
  paragraph?: IParagraph;
}

export class Elements implements IElements {
  constructor(
    public pageId: string,
    public id?: string,
    public orderNo?: number,
    public type?: string,
    public question?: IQuestion,
    public paragraph?: IParagraph,
  ) {
    const uuid: string = UUID.UUID();
    const newQuestion = new Question();
    newQuestion.elementId = uuid;

    this.id = id ? id : UUID.UUID();
    this.pageId = pageId ? pageId : '';
    this.orderNo = orderNo ? orderNo : 1;
    this.type = type ? type : 'question';
    this.question = question ? question : newQuestion;
    this.paragraph = paragraph ? paragraph : null;
  }
}
