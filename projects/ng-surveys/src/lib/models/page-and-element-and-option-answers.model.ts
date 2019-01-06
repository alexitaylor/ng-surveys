import {IElementsMap} from './elements.model';
import {IOptionAnswersMaps} from './option-answers.model';
import {IPage} from './page.model';

export interface IPageAndElementAndOptionAnswers {
  page: IPage;
  elements: IElementsMap;
  optionAnswers: IOptionAnswersMaps;
}

export class PageAndElementAndOptionAnswersModel implements IPageAndElementAndOptionAnswers {
  constructor(
    public page: IPage,
    public elements: IElementsMap,
    public optionAnswers: IOptionAnswersMaps,
  ) {}
}
