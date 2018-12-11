import { Action } from '@ngrx/store';
import {IPageFlow} from '../../models/page-flow.model';
import {AppState} from '../app.state';

export enum ElementsActionTypes {
  ADD_ELEMENT_ACTION = '[Angular Element] Add survey question element',
  REMOVE_ELEMENT_ACTION = '[Angular Element] Remove survey question element',
  REMOVE_ELEMENT_MAP_ACTION = '[Angular Element] Remove element map',
  MOVE_ELEMENT_UP_ACTION = '[Angular Element] Move survey question element up',
  MOVE_ELEMENT_DOWN_ACTION = '[Angular Element] Move survey question element down',
  DRAG_ELEMENT_ACTION = '[Angular Element] Drag survey question element',
  QUESTION_ADD_TEXT_ACTION = '[Angular Question] Add question text',
  QUESTION_ADD_TYPE_ACTION = '[Angular Question] Add question type',
  QUESTION_UPDATE_MIN_ACTION = '[Angular Question] Update question max value',
  QUESTION_UPDATE_MAX_ACTION = '[Angular Question] Update question min value',
  QUESTION_REMOVE_VALUES_ACTION = '[Angular Question] Remove question values',
  QUESTION_UPDATE_PAGE_FLOW_MODIFIER_ACTION = '[Angular Question] UPDATE question page flow modifier',
  TOGGLE_IS_ACTIVE_ELEMENT_ACTION = '[Angular Element] Toggle isActive element',
  QUESTION_UPDATE_ANSWER_ACTION = '[Angular Question] Update question answer value',
  RESET_ELEMENTS_STATE = '[Angular Element] Reset elements state',
}

export class AddElementAction implements Action {
  readonly type = ElementsActionTypes.ADD_ELEMENT_ACTION;
  constructor(public payload: { pageId: string }) { }
}

export class RemoveElementAction implements Action {
  readonly type = ElementsActionTypes.REMOVE_ELEMENT_ACTION;
  constructor(public payload: { pageId: string, elementId: string }) { }
}

export class RemoveElementsMapAction implements Action {
  readonly type = ElementsActionTypes.REMOVE_ELEMENT_MAP_ACTION;
  constructor(public payload: { pageId: string, elementIds: string[] }) { }
}

export class MoveElementUpAction implements Action {
  readonly type = ElementsActionTypes.MOVE_ELEMENT_UP_ACTION;
  constructor(public payload: { pageId: string, elementId: string }) { }
}

export class MoveElementDownAction implements Action {
  readonly type = ElementsActionTypes.MOVE_ELEMENT_DOWN_ACTION;
  constructor(public payload: { pageId: string, elementId: string }) { }
}

export class DragElementAction implements Action {
  readonly type = ElementsActionTypes.DRAG_ELEMENT_ACTION;
  constructor(public payload: { pageId: string, startIndex: number, endIndex: number }) { }
}

export class AddQuestionTextAction implements Action {
  readonly type = ElementsActionTypes.QUESTION_ADD_TEXT_ACTION;
  constructor(public payload: { pageId: string, elementId: string, text: string }) { }
}

export class AddQuestionTypeAction implements Action {
  readonly type = ElementsActionTypes.QUESTION_ADD_TYPE_ACTION;
  constructor(public payload: { pageId: string, elementId: string, type: string }) { }
}

export class UpdateQuestionMinAction implements Action {
  readonly type = ElementsActionTypes.QUESTION_UPDATE_MIN_ACTION;
  constructor(public payload: { pageId: string, elementId: string, min: number }) { }
}

export class UpdateQuestionMaxAction implements Action {
  readonly type = ElementsActionTypes.QUESTION_UPDATE_MAX_ACTION;
  constructor(public payload: { pageId: string, elementId: string, max: number }) { }
}

export class RemoveQuestionValuesAction implements Action {
  readonly type = ElementsActionTypes.QUESTION_REMOVE_VALUES_ACTION;
  constructor(public payload: { pageId: string, elementId: string }) { }
}

export class UpdateQuestionPageFlowModifierAction implements Action {
  readonly type = ElementsActionTypes.QUESTION_UPDATE_PAGE_FLOW_MODIFIER_ACTION;
  constructor(public payload: { pageId: string, elementId: string, pageFlowModifier: boolean }) { }
}

export class ToggleIsActiveElementAction implements Action {
  readonly type = ElementsActionTypes.TOGGLE_IS_ACTIVE_ELEMENT_ACTION;
  constructor(public payload: { pageId: string, elementId: string, isSaved: boolean }) { }
}

export class UpdateQuestionAnswerAction implements Action {
  readonly type = ElementsActionTypes.QUESTION_UPDATE_ANSWER_ACTION;
  constructor(public payload: {
      pageId: string,
      elementId: string,
      answer: string | number,
      pageFlowModifier: boolean,
      pageFlow: IPageFlow,
      surveyId: string
  }) { }
}

export class ResetElementsStateAction implements Action {
  readonly type = ElementsActionTypes.RESET_ELEMENTS_STATE;
  constructor(public payload: { appState: AppState }) { }
}

export type Actions =
  AddElementAction |
  RemoveElementAction |
  RemoveElementsMapAction |
  MoveElementUpAction |
  MoveElementDownAction |
  DragElementAction |
  AddQuestionTextAction |
  AddQuestionTypeAction |
  UpdateQuestionMinAction |
  UpdateQuestionMaxAction |
  RemoveQuestionValuesAction |
  UpdateQuestionPageFlowModifierAction |
  ToggleIsActiveElementAction |
  UpdateQuestionAnswerAction |
  ResetElementsStateAction;
