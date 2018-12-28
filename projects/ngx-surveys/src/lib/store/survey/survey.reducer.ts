import { Injectable } from '@angular/core';
import {SurveyActionTypes} from './survey.actions';
import {CustomAction, INgxSurvey} from '../../models';
import * as _ from 'lodash';
import {NgxSurveyStore} from '../ngx-survey.store';
import {PagesReducer} from '../pages/pages.reducer';
import {ElementsReducer} from '../elements/elements.reducer';
import {OptionAnswersReducer} from '../option-answers/option-answers.reducer';
import {PagesActionTypes} from '../pages/pages.actions';
import {ElementsActionTypes} from '../elements/elements.actions';
import {OptionAnswersActionTypes} from '../option-answers/option-answers.actions';

@Injectable()
export class SurveyReducer {

  constructor(
    private _ngxSurveyStore: NgxSurveyStore,
    private _pagesReducer: PagesReducer,
    private _elementsReducer: ElementsReducer,
    private _optionAnswersReducer: OptionAnswersReducer,
  ) {}

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

        // Effects
        this._pagesReducer.pagesReducer({
          type: PagesActionTypes.RESET_PAGE_STATE,
          payload: { ngxSurveyState },
        });
        this._elementsReducer.elementsReducer({
          type: ElementsActionTypes.RESET_ELEMENTS_STATE,
          payload: { ngxSurveyState },
        });
        this._optionAnswersReducer.optionAnswersReducer({
          type: OptionAnswersActionTypes.RESET_OPTION_ANSWERS_STATE,
          payload: { ngxSurveyState },
        });

        setTimeout(() => {
          this.surveyReducer({
            type: SurveyActionTypes.HANDLE_SURVEY_LOADING,
            payload: { isLoading: false }
          });
        }, 1000);
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

        // Effects
        this._pagesReducer.pagesReducer({
          type: PagesActionTypes.IMPORT_PAGE_STATE,
          payload: { ngxSurveyState },
        });
        this._elementsReducer.elementsReducer({
          type: ElementsActionTypes.IMPORT_ELEMENTS_STATE,
          payload: { ngxSurveyState },
        });
        this._optionAnswersReducer.optionAnswersReducer({
          type: OptionAnswersActionTypes.IMPORT_OPTION_ANSWERS_STATE,
          payload: { ngxSurveyState },
        });
        this.surveyReducer({
          type: SurveyActionTypes.HANDLE_SURVEY_LOADING,
          payload: { isLoading: false }
        });

        break;
      }

      default: {
        return this._ngxSurveyStore.survey;
      }
    }
  }
}
