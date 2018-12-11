import {AppState} from './app.state';
import {ActionReducer, MetaReducer} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromSurvey from './survey/survey.reducer';
import * as fromPages from './pages/pages.reducer';
import * as fromElements from './elements/elements.reducer';
import * as fromOptionAnswers from './option-answers/option-answers.reducer';
import {IPage, IPageMap} from '../models/page.model';
import {IElements, IElementsMap} from '../models/elements.model';
import {IOptionAnswers, IOptionAnswersMap} from '../models/option-answers.model';


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
          deserialize: (json: any) => {
            const pagesMap = new Map<string, IPageMap>();

            json.forEach(outer => {
              const pageMap = new Map<string, IPage>();
              outer[1].forEach(inner => {
                pageMap.set(inner[0], inner[1]);
              });
              pagesMap.set(outer[0], pageMap);
            });

            return pagesMap;
          }
        },
      },
      {
        elements: {
          deserialize: (json: any) => {
            const elementsMap = new Map<string, IElementsMap>();

            json.forEach(outer => {
              const elementMap = new Map<string, IElements>();
              outer[1].forEach(inner => {
                elementMap.set(inner[0], inner[1]);
              });
              elementsMap.set(outer[0], elementMap);
            });

            return elementsMap;
          }
        },
      },
      {
        optionAnswers: {
          deserialize: (json: any) => {
            const optionAnswersMap = new Map<string, IOptionAnswersMap>();

            json.forEach(outer => {
              const optionAnswerMap = new Map<string, IOptionAnswers>();
              outer[1].forEach(inner => {
                optionAnswerMap.set(inner[0], inner[1]);
              });
              optionAnswersMap.set(outer[0], optionAnswerMap);
            });

            return optionAnswersMap;
          }
        }
      }
    ], rehydrate: true})(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

// Survey Selectors
export const getSurveyName = (state: AppState) => state.survey.name;
export const getSurveyDescription = (state: AppState) => state.survey.description;
export const getSurveyId = (state: AppState) => state.survey.id;

// Pages Selectors
export const getPagesBySurveyId = (state: AppState, { surveyId }) => state.pages.get(surveyId);
export const getSurveyPageSize = (state: AppState, { surveyId }) => {
  if (state.pages.get(surveyId)) {
    return state.pages.get(surveyId).size;
  }  else {
    return 0;
  }
};

// Elements Selectors
export const getElementsByPageId = (state: AppState, { pageId }) => state.elements.get(pageId);
export const getElementsSize = (state: AppState, { pageId }) => state.elements.get(pageId).size;

// Option Answers Selectors
export const getOptionAnswers = (state: AppState, { elementId }) =>
  state.optionAnswers.get(elementId);

