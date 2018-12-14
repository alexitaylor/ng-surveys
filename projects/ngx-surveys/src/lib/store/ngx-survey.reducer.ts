import {NgxSurveyState} from './ngx-survey.state';
import {ActionReducer, MetaReducer} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromSurvey from './survey/survey.reducer';
import * as fromPages from './pages/pages.reducer';
import * as fromElements from './elements/elements.reducer';
import * as fromOptionAnswers from './option-answers/option-answers.reducer';
import {deserializePages, deserializeElements, deserializeOptionAnswers} from './utils';


export const reducers = {
  survey: fromSurvey.reducer,
  pages: fromPages.reducer,
  elements: fromElements.reducer,
  optionAnswers: fromOptionAnswers.reducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: [
      {
        survey: {
          deserialize: (json: any) => json,
        },
      },
      {
        pages: {
          deserialize: (json: any) => deserializePages(json),
        },
      },
      {
        elements: {
          deserialize: (json: any) => deserializeElements(json),
        },
      },
      {
        optionAnswers: {
          deserialize: (json: any) => deserializeOptionAnswers(json),
        }
      }
    ], rehydrate: true})(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

// State Selectors
export const getNgxSurveyState = (state: NgxSurveyState) => state;

// Survey Selectors
export const getSurvey = (state: NgxSurveyState) => state.survey;
export const getSurveyName = (state: NgxSurveyState) => state.survey.name;
export const getSurveyDescription = (state: NgxSurveyState) => state.survey.description;
export const getSurveyId = (state: NgxSurveyState) => state.survey.id;

// Pages Selectors
export const getPages = (state: NgxSurveyState) => state.pages;
export const getPagesSize = (state: NgxSurveyState) => {
  if (state.pages) {
    return state.pages.size;
  }  else {
    return 0;
  }
};

// Elements Selectors
export const getElements = (state: NgxSurveyState) => state.elements;
export const getElementsByPageId = (state: NgxSurveyState, { pageId }) => state.elements.get(pageId);
export const getElementByPageIdAndElementId = (state: NgxSurveyState, { pageId, elementId }) => state.elements.get(pageId).get(elementId);
export const getElementsSize = (state: NgxSurveyState, { pageId }) => state.elements.get(pageId).size;

// Option Answers Selectors
export const getOptionAnswers = (state: NgxSurveyState) => state.optionAnswers;
export const getOptionAnswersByElementId = (state: NgxSurveyState, { elementId }) =>
  state.optionAnswers.get(elementId);

