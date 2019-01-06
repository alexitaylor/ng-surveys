import {IQuestion, Question} from './question.model';
import * as utils from '../store/utils';
import {IParagraph} from './paragraph.model';

export type IElementsMap = Map<string, IElements>;
export type IElementsMaps = Map<string, IElementsMap>;

export interface IElements {
  pageId: string;
  id?: string;
  orderNo?: number;
  type?: string;
  question?: IQuestion;
  paragraph?: IParagraph;
  isSaved?: boolean;
  showPageFlowToggle?: boolean;
}

export class Elements implements IElements {
  constructor(
    public pageId: string,
    public id?: string,
    public orderNo?: number,
    public type?: string,
    public question?: IQuestion,
    public paragraph?: IParagraph,
    public isSaved?: boolean,
    public showPageFlowToggle?: boolean,
  ) {
    const uuid: string = utils.UUID();
    const newQuestion = new Question();
    newQuestion.elementId = uuid;

    this.id = id ? id : uuid;
    this.pageId = pageId ? pageId : '';
    this.orderNo = orderNo ? orderNo : 1;
    this.type = type ? type : 'question';
    this.question = question ? question : newQuestion;
    this.paragraph = paragraph ? paragraph : null;
    this.isSaved = isSaved ? isSaved : false;
    this.showPageFlowToggle = showPageFlowToggle ? showPageFlowToggle : true;
  }
}
