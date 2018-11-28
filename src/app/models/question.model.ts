import {IOfferedAnswers, IOfferedAnswersMap, OfferedAnswers} from './offered-answers.model';
import { UUID } from 'angular2-uuid';

export interface IQuestion {
  id?: string;
  text?: string;
  type?: string;
  required?: boolean;
  pageFlowModifier?: boolean;
  offeredAnswers?: IOfferedAnswersMap;
}

export class Question implements IQuestion {
  constructor(
    public id?: string,
    public text?: string,
    public type?: string,
    public required?: boolean,
    public pageFlowModifier?: boolean,
    public offeredAnswers?: IOfferedAnswersMap,
  ) {
    const newOfferedAnswers = new OfferedAnswers();
    const offeredAnswersMap = new Map<string, IOfferedAnswers>();
    offeredAnswersMap.set(newOfferedAnswers.id, newOfferedAnswers);

    this.id = id ? id : UUID.UUID();
    this.text = text ? text : '';
    this.type = type ? type : '';
    this.required = required ? required : false;
    this.pageFlowModifier = pageFlowModifier ? pageFlowModifier : false;
    this.offeredAnswers = offeredAnswers ? offeredAnswers : offeredAnswersMap;
  }
}
