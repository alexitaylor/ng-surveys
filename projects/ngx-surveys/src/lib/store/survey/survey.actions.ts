import { Action } from '@ngrx/store';
import {NgxSurveyState} from '../ngx-survey.state';

export enum SurveyActionTypes {
  SURVEY_NAME_CHANGED_ACTION = '[Angular Surveys] Survey title change',
  SURVEY_DESCRIPTION_CHANGED_ACTION = '[Angular Surveys] Survey description change',
  SURVEY_SUMMARY_CHANGED_ACTION = '[Angular Surveys] Survey summary change',
  RESET_SURVEY_STATE_ACTION = '[Angular Surveys] Reset survey state',
  HANDLE_SURVEY_LOADING = '[Angular Surveys] Handle is survey loading'
}

export class SurveyNameChangedAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_NAME_CHANGED_ACTION;
  constructor(public payload: { name: string}) { }
}

export class SurveyDescriptionChangedAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_DESCRIPTION_CHANGED_ACTION;
  constructor(public payload: { description: string }) { }
}

export class SurveySummaryChangedAction implements Action {
  readonly type = SurveyActionTypes.SURVEY_SUMMARY_CHANGED_ACTION;
  constructor(public payload: { summary: string }) { }
}

export class ResetSurveyStateAction implements Action {
  readonly type = SurveyActionTypes.RESET_SURVEY_STATE_ACTION;
  constructor(public payload: { ngxSurveyState: NgxSurveyState }) {}
}

export class HandleSurveyLoading implements Action {
  readonly type = SurveyActionTypes.HANDLE_SURVEY_LOADING;
  constructor(public payload: { isLoading: boolean }) {}
}

export type SurveyActions =
  SurveyNameChangedAction |
  SurveyDescriptionChangedAction |
  SurveySummaryChangedAction |
  ResetSurveyStateAction |
  HandleSurveyLoading;
