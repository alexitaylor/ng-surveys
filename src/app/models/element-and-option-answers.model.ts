import {IElements} from './elements.model';
import {IOptionAnswersMap} from './option-answers.model';

export interface IElementAndOptionAnswers {
  element: IElements;
  optionAnswers: IOptionAnswersMap;
}

export class ElementAndOptionAnswersModel implements IElementAndOptionAnswers {
  constructor(
    public element: IElements,
    public optionAnswers: IOptionAnswersMap,
  ) {}
}
