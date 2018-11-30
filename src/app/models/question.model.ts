import {IOptionAnswersMap} from './option-answers.model';
import { UUID } from 'angular2-uuid';

export interface IQuestion {
  id?: string;
  text?: string;
  type?: string;
  required?: boolean;
  pageFlowModifier?: boolean;
  elementId?: string;
  optionAnswers?: IOptionAnswersMap;
  min?: number;
  max?: number;
}

export class Question implements IQuestion {
  constructor(
    public id?: string,
    public text?: string,
    public type?: string,
    public required?: boolean,
    public pageFlowModifier?: boolean,
    public elementId?: string,
    public optionAnswers?: IOptionAnswersMap,
    public min?: number,
    public max?: number,
  ) {
    this.id = id ? id : UUID.UUID();
    this.text = text ? text : '';
    this.type = type ? type : '';
    this.required = required ? required : false;
    this.pageFlowModifier = pageFlowModifier ? pageFlowModifier : false;
    this.elementId = elementId ? elementId : '';
    this.optionAnswers = optionAnswers ? optionAnswers : null;
    this.min = min ? min : null;
    this.max = max ? max : null;
  }
}
