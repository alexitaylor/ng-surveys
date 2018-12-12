import {AngularSurvey, IAngularSurvey} from '../models/angular-survey.model';
import {IElements, IElementsMap, Elements, IElementsMapMap} from '../models/elements.model';
import {IPage, IPageMap, Page, IPageMapMap} from '../models/page.model';
import {IOptionAnswers, IOptionAnswersMap, IOptionAnswersMapMap} from '../models/option-answers.model';
import {UUID} from 'angular2-uuid';

export interface NgxSurveyState {
  survey: IAngularSurvey;
  pages: IPageMapMap;
  elements: IElementsMapMap;
  optionAnswers: IOptionAnswersMapMap;
}

// Init Survey
const angularSurvey = new AngularSurvey();

// Init Pages
const pageId = UUID.UUID();
const page = new Page(pageId, angularSurvey.id);
const pageMap = new Map<string, IPage>().set(page.id, page);
const pagesMap = new Map<string, IPageMap>().set(angularSurvey.id, pageMap);

// Init Elements
const element = new Elements(page.id);
const elementMap = new Map<string, IElements>().set(element.id, element);
const elementsMap = new Map<string, IElementsMap>().set(page.id, elementMap);

// Init Option Answers
const optionAnswerMap = new Map<string, IOptionAnswers>();
const optionAnswersMap = new Map<string, IOptionAnswersMap>().set(element.id, optionAnswerMap);

export const appInitialState = {
  survey: angularSurvey,
  pages: pagesMap,
  elements: elementsMap,
  optionAnswers: optionAnswersMap,
};
