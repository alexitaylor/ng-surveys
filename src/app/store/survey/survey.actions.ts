import { Action } from '@ngrx/store';
import {IPageFlow} from '../../models/page-flow.model';

export enum SurveyActionTypes {
  SURVEY_NAME_CHANGED_ACTION = '[Angular Surveys] Survey title change',
  SURVEY_DESCRIPTION_CHANGED_ACTION = '[Angular Surveys] Survey description change',
  SURVEY_SUMMARY_CHANGED_ACTION = '[Angular Surveys] Survey summary change',
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

export type SurveyActions =
  SurveyNameChangedAction |
  SurveyDescriptionChangedAction |
  SurveySummaryChangedAction;
