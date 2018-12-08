import {IOptionAnswersMap} from './option-answers.model';
import { UUID } from 'angular2-uuid';

export interface IQuestion {
  id?: string;
  text?: string;
  answer?: string | number;
  type?: string;
  required?: boolean;
  pageFlowModifier?: boolean;
  elementId?: string;
  min?: number;
  max?: number;
}

export class Question implements IQuestion {
  constructor(
    public id?: string,
    public text?: string,
    public answer?: string | number,
    public type?: string,
    public required?: boolean,
    public pageFlowModifier?: boolean,
    public elementId?: string,
    public min?: number,
    public max?: number,
  ) {
    this.id = id ? id : UUID.UUID();
    this.text = text ? text : '';
    this.answer = answer ? answer : '';
    this.type = type ? type : '';
    this.required = required ? required : false;
    this.pageFlowModifier = pageFlowModifier ? pageFlowModifier : false;
    this.elementId = elementId ? elementId : '';
    this.min = min ? min : null;
    this.max = max ? max : null;
  }
}
