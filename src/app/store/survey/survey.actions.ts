import { Action } from '@ngrx/store';

export enum SurveyActionTypes {
  SURVEY_NAME_CHANGED_ACTION = '[Angular Surveys] Survey title change',
  SURVEY_DESCRIPTION_CHANGED_ACTION = '[Angular Surveys] Survey description change',
  SURVEY_ADD_PAGE_ACTION = '[Angular Surveys Page] Add survey page',
  SURVEY_REMOVE_PAGE_ACTION = '[Angular Surveys Page] Remove survey page',
  SURVEY_ADD_ELEMENT_ACTION = '[Angular Surveys Element] Add survey question element',
  SURVEY_REMOVE_ELEMENT_ACTION = '[Angular Surveys Element] Remove survey question element',
  SURVEY_QUESTION_ADD_TEXT_ACTION = '[Angular Surveys Question] Add question text',
  SURVEY_QUESTION_ADD_TYPE_ACTION = '[Angular Surveys Question] Add question type',
}

export class SurveyNameChangedAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_NAME_CHANGED_ACTION;
  constructor(public payload: { name: string}) { }
}

export class SurveyDescriptionChangedAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_DESCRIPTION_CHANGED_ACTION;
  constructor(public payload: { description: string }) { }
}

export class SurveyAddPageAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_ADD_PAGE_ACTION;
  constructor(public payload?: any) { }
}

export class SurveyRemovePageAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_REMOVE_PAGE_ACTION;
  constructor(public payload: { pageId: string }) { }
}

export class SurveyAddElementAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_ADD_ELEMENT_ACTION;
  constructor(public payload: { pageId: string }) { }
}

export class SurveyRemoveElementAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_REMOVE_ELEMENT_ACTION;
  constructor(public payload: { pageId: string, elementId: string }) { }
}

export class SurveyAddQuestionTextAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_ADD_TEXT_ACTION;
  constructor(public payload: { pageId: string, elementId: string, text: string }) { }
}

export class SurveyAddQuestionTypeAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_ADD_TYPE_ACTION;
  constructor(public payload: { pageId: string, elementId: string, type: string }) { }
}

export type SurveyActions =
  SurveyNameChangedAction |
  SurveyDescriptionChangedAction |
  SurveyAddPageAction |
  SurveyRemovePageAction |
  SurveyAddElementAction |
  SurveyRemoveElementAction |
  SurveyAddQuestionTextAction |
  SurveyAddQuestionTypeAction;
