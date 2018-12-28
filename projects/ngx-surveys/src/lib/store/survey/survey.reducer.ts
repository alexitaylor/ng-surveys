import { Injectable } from '@angular/core';
import {SurveyActionTypes} from './survey.actions';
import {CustomAction, INgxSurvey} from '../../models';
import * as _ from 'lodash';
import {NgxSurveyStore} from '../ngx-survey.store';

@Injectable()
export class SurveyReducer {

  constructor(private _ngxSurveyStore: NgxSurveyStore) {}

  surveyReducer(action: CustomAction) {
    const state: INgxSurvey = this._ngxSurveyStore.dataStore.survey;

    switch (action.type) {

      case SurveyActionTypes.SURVEY_NAME_CHANGED_ACTION: {
        const newState = Object.assign(_.cloneDeep(state), {
          ...action.payload
        });
        this._ngxSurveyStore.updateSurvey(newState);
        break;
      }

      case SurveyActionTypes.SURVEY_DESCRIPTION_CHANGED_ACTION: {
        const newState = Object.assign(_.cloneDeep(state), {
          ...action.payload
        });
        this._ngxSurveyStore.updateSurvey(newState);
        break;
      }

      case SurveyActionTypes.SURVEY_SUMMARY_CHANGED_ACTION: {
        const newState = Object.assign(_.cloneDeep(state), {
          ...action.payload
        });
        this._ngxSurveyStore.updateSurvey(newState);
        break;
      }

      case SurveyActionTypes.RESET_SURVEY_STATE_ACTION: {
        const { ngxSurveyState } = action.payload;
        this._ngxSurveyStore.updateSurvey(ngxSurveyState.survey);
        break;
      }

      case SurveyActionTypes.HANDLE_SURVEY_LOADING: {
        const newState = Object.assign(_.cloneDeep(state), {
          ...action.payload
        });
        this._ngxSurveyStore.updateSurvey(newState);
        break;
      }

      case SurveyActionTypes.IMPORT_SURVEY_STATE_ACTION: {
        const { ngxSurveyState } = action.payload;
        this._ngxSurveyStore.updateSurvey(ngxSurveyState.survey);
        break;
      }

      default: {
        return this._ngxSurveyStore.survey;
      }
    }
  }
}
