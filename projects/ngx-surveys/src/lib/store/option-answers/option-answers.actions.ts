import { Action } from '@ngrx/store';
import {IPageFlow} from '../../models/page-flow.model';
import {NgxSurveyState} from '../ngx-survey.state';
import {IOptionAnswersMap} from '../../models';

export enum OptionAnswersActionTypes {
  ADD_OPTION_ANSWERS_ACTION = '[Angular Option Answers] Add question option answer',
  REMOVE_OPTION_ANSWERS_ACTION = '[Angular Option Answers] Remove question option answer',
  REMOVE_OPTION_ANSWERS_MAP_ACTION = '[Angular Option Answers] Remove question option answer map',
  REMOVE_OPTION_ANSWERS_MAPS_ACTION = '[Angular Option Answers] Remove question option answer maps',
  ADD_OPTION_ANSWERS_VALUE_ACTION = '[Angular Option Answers] Add question option answer value',
  UPDATE_OPTION_ANSWERS_PAGE_FLOW = '[Angular Option Answers] Update question option page flow',
  DRAG_OPTION_ANSWERS_ACTION = '[Angular Option Answers] Drag question options',
  TOGGLE_IS_ACTIVE_OPTION_ANSWERS_ACTION = '[Angular Option Answers] Toggle isActive question options',
  RESET_OPTION_ANSWERS_STATE = '[Angular Option Answers] Reset option answers state',
<<<<<<< Updated upstream
=======
  IMPORT_OPTION_ANSWERS_STATE = '[Angular Option Answers] Import option answers state',
  IMPORT_OPTION_ANSWERS = '[Angular Option Answers] Import option answers',
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

export class AddOptionAnswersAction implements Action {
  readonly type = OptionAnswersActionTypes.ADD_OPTION_ANSWERS_ACTION;
  constructor(public payload: { elementId: string }) { }
}

export class RemoveOptionAnswersAction implements Action {
  readonly type = OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_ACTION;
  constructor(public payload: { elementId: string, optionAnswerId: string }) { }
}

export class RemoveOptionAnswersMapAction implements Action {
  readonly type = OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_MAP_ACTION;
  constructor(public payload: { elementId: string }) { }
}

export class RemoveOptionAnswersMapsAction implements Action {
  readonly type = OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_MAPS_ACTION;
  constructor(public payload: { elementIds: string[] }) { }
}

export class AddOptionAnswerValueAction implements Action {
  readonly type = OptionAnswersActionTypes.ADD_OPTION_ANSWERS_VALUE_ACTION;
  constructor(public payload: { elementId: string, optionAnswerId: string, value: string }) { }
}

export class UpdateOptionAnswerPageFlow implements Action {
  readonly type = OptionAnswersActionTypes.UPDATE_OPTION_ANSWERS_PAGE_FLOW;
  constructor(public payload: { elementId: string, optionAnswerId: string, pageFlow: IPageFlow }) { }
}

export class DragOptionAnswerAction implements Action {
  readonly type = OptionAnswersActionTypes.DRAG_OPTION_ANSWERS_ACTION;
  constructor(public payload: { elementId: string, startIndex: number, endIndex: number }) { }
}

export class ToggleIsActiveOptionAnswerAction implements Action {
  readonly type = OptionAnswersActionTypes.TOGGLE_IS_ACTIVE_OPTION_ANSWERS_ACTION;
  constructor(public payload: { elementId: string, isSaved: boolean }) { }
}

export class ResetOptionAnswersStateAction implements Action {
  readonly type = OptionAnswersActionTypes.RESET_OPTION_ANSWERS_STATE;
  constructor(public payload: { ngxSurveyState: NgxSurveyState }) { }
}

<<<<<<< Updated upstream
=======
export class ImportOptionAnswersStateAction implements Action {
  readonly type = OptionAnswersActionTypes.IMPORT_OPTION_ANSWERS_STATE;
  constructor(public payload: { ngxSurveyState: NgxSurveyState }) { }
}

export class ImportOptionAnswersAction implements Action {
  readonly type = OptionAnswersActionTypes.IMPORT_OPTION_ANSWERS;
  constructor(public payload: { newOptionAnswers: IOptionAnswersMap, elementId: string }) { }
}

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
export type Actions =
  AddOptionAnswersAction |
  RemoveOptionAnswersAction |
  RemoveOptionAnswersMapAction |
  RemoveOptionAnswersMapsAction |
  AddOptionAnswerValueAction |
  UpdateOptionAnswerPageFlow |
  DragOptionAnswerAction |
  ToggleIsActiveOptionAnswerAction |
<<<<<<< Updated upstream
  ResetOptionAnswersStateAction;
=======
  ResetOptionAnswersStateAction |
  ImportOptionAnswersStateAction |
  ImportOptionAnswersAction;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
