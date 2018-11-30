import { Action } from '@ngrx/store';
import {IPageFlow} from '../../models/page-flow.model';

export enum SurveyActionTypes {
  SURVEY_NAME_CHANGED_ACTION = '[Angular Surveys] Survey title change',
  SURVEY_DESCRIPTION_CHANGED_ACTION = '[Angular Surveys] Survey description change',
  SURVEY_ADD_PAGE_ACTION = '[Angular Surveys Page] Add survey page',
  SURVEY_INSERT_PAGE_ACTION = '[Angular Surveys Page] Insert survey page',
  SURVEY_MOVE_PAGE_UP_ACTION = '[Angular Surveys Page] Move survey page up',
  SURVEY_MOVE_PAGE_DOWN_ACTION = '[Angular Surveys Page] Move survey page down',
  SURVEY_REMOVE_PAGE_ACTION = '[Angular Surveys Page] Remove survey page',
  SURVEY_UPDATE_PAGE_NAME_ACTION = '[Angular Surveys Page] Update survey page name',
  SURVEY_UPDATE_PAGE_DESCRIPTION_ACTION = '[Angular Surveys Page] Update survey page description',
  SURVEY_UPDATE_PAGE_PAGE_FLOW_ACTION = '[Angular Surveys Page] Update survey page page flow',
  SURVEY_ADD_ELEMENT_ACTION = '[Angular Surveys Element] Add survey question element',
  SURVEY_REMOVE_ELEMENT_ACTION = '[Angular Surveys Element] Remove survey question element',
  SURVEY_MOVE_ELEMENT_UP_ACTION = '[Angular Surveys Element] Move survey question element up',
  SURVEY_MOVE_ELEMENT_DOWN_ACTION = '[Angular Surveys Element] Move survey question element down',
  SURVEY_QUESTION_ADD_TEXT_ACTION = '[Angular Surveys Question] Add question text',
  SURVEY_QUESTION_ADD_TYPE_ACTION = '[Angular Surveys Question] Add question type',
  SURVEY_QUESTION_UPDATE_MIN_ACTION = '[Angular Surveys Question] Update question max value',
  SURVEY_QUESTION_UPDATE_MAX_ACTION = '[Angular Surveys Question] Update question min value',
  SURVEY_QUESTION_REMOVE_MIN_MAX_ACTION = '[Angular Surveys Question] Remove question min and max value',
  SURVEY_QUESTION_UPDATE_PAGE_FLOW_MODIFIER_ACTION = '[Angular Surveys Question] UPDATE question page flow modifier',
  SURVEY_QUESTION_ADD_OPTION_ANSWERS_ACTION = '[Angular Surveys Option Answers] Add question option answer',
  SURVEY_QUESTION_REMOVE_OPTION_ANSWERS_ACTION = '[Angular Surveys Option Answers] Remove question option answer',
  SURVEY_QUESTION_ADD_OPTION_ANSWERS_VALUE_ACTION = '[Angular Surveys Option Answers] Add question option answer value',
  SURVEY_QUESTION_UPDATE_OPTION_ANSWERS_PAGE_FLOW = '[Angular Surveys Option Answers] Update question option page flow',
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

export class SurveyInsertPageAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_INSERT_PAGE_ACTION;
  constructor(public payload?: { previousPageId: string }) { }
}

export class SurveyMovePageUpAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_MOVE_PAGE_UP_ACTION;
  constructor(public payload?: { pageId: string }) { }
}

export class SurveyMovePageDownAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_MOVE_PAGE_DOWN_ACTION;
  constructor(public payload?: { pageId: string }) { }
}

export class SurveyRemovePageAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_REMOVE_PAGE_ACTION;
  constructor(public payload: { pageId: string }) { }
}

export class SurveyUpdatePageNameAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_UPDATE_PAGE_NAME_ACTION;
  constructor(public payload: { pageId: string,  name: string }) { }
}

export class SurveyUpdatePageDescriptionAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_UPDATE_PAGE_DESCRIPTION_ACTION;
  constructor(public payload: { pageId: string,  description: string }) { }
}

export class SurveyUpdatePagePageFlowAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_UPDATE_PAGE_PAGE_FLOW_ACTION;
  constructor(public payload: { pageId: string,  pageFlow: IPageFlow }) { }
}

export class SurveyAddElementAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_ADD_ELEMENT_ACTION;
  constructor(public payload: { pageId: string }) { }
}

export class SurveyRemoveElementAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_REMOVE_ELEMENT_ACTION;
  constructor(public payload: { pageId: string, elementId: string }) { }
}

export class SurveyMoveElementUpAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_MOVE_ELEMENT_UP_ACTION;
  constructor(public payload?: { pageId: string, elementId: string }) { }
}

export class SurveyMoveElementDownAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_MOVE_ELEMENT_DOWN_ACTION;
  constructor(public payload?: { pageId: string, elementId: string }) { }
}

export class SurveyAddQuestionTextAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_ADD_TEXT_ACTION;
  constructor(public payload: { pageId: string, elementId: string, text: string }) { }
}

export class SurveyAddQuestionTypeAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_ADD_TYPE_ACTION;
  constructor(public payload: { pageId: string, elementId: string, type: string }) { }
}

export class SurveyUpdateQuestionMinAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_UPDATE_MIN_ACTION;
  constructor(public payload: { pageId: string, elementId: string, min: number }) { }
}

export class SurveyUpdateQuestionMaxAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_UPDATE_MAX_ACTION;
  constructor(public payload: { pageId: string, elementId: string, max: number }) { }
}

export class SurveyRemoveQuestionMinAndMaxAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_REMOVE_MIN_MAX_ACTION;
  constructor(public payload: { pageId: string, elementId: string }) { }
}

export class SurveyUpdateQuestionPageFlowModifierAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_UPDATE_PAGE_FLOW_MODIFIER_ACTION;
  constructor(public payload: { pageId: string, elementId: string, pageFlowModifier: boolean }) { }
}

export class SurveyAddOptionAnswersAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_ADD_OPTION_ANSWERS_ACTION;
  constructor(public payload: { pageId: string, elementId: string }) { }
}

export class SurveyRemoveOptionAnswersAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_REMOVE_OPTION_ANSWERS_ACTION;
  constructor(public payload: { pageId: string, elementId: string, optionAnswerId: string }) { }
}

export class SurveyAddOptionAnswerValueAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_ADD_OPTION_ANSWERS_VALUE_ACTION;
  constructor(public payload: { pageId: string, elementId: string, optionAnswerId: string, value: string }) { }
}

export class SurveyUpdateOptionAnswerPageFlow implements Action {
  readonly type = SurveyActionTypes.SURVEY_QUESTION_UPDATE_OPTION_ANSWERS_PAGE_FLOW;
  constructor(public payload: { pageId: string, elementId: string, optionAnswerId: string, pageFlow: IPageFlow }) { }
}

export type SurveyActions =
  SurveyNameChangedAction |
  SurveyDescriptionChangedAction |
  SurveyAddPageAction |
  SurveyInsertPageAction |
  SurveyMovePageUpAction |
  SurveyMovePageDownAction |
  SurveyRemovePageAction |
  SurveyUpdatePageNameAction |
  SurveyUpdatePageDescriptionAction |
  SurveyUpdatePagePageFlowAction |
  SurveyAddElementAction |
  SurveyRemoveElementAction |
  SurveyMoveElementUpAction |
  SurveyMoveElementDownAction |
  SurveyAddQuestionTextAction |
  SurveyAddQuestionTypeAction |
  SurveyUpdateQuestionMinAction |
  SurveyUpdateQuestionMaxAction |
  SurveyRemoveQuestionMinAndMaxAction |
  SurveyUpdateQuestionPageFlowModifierAction |
  SurveyAddOptionAnswersAction |
  SurveyRemoveOptionAnswersAction |
  SurveyAddOptionAnswerValueAction |
  SurveyUpdateOptionAnswerPageFlow;
