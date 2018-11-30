import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {surveyReducer} from './survey/survey.reducer';


export const reducers: ActionReducerMap<AppState> = {
  survey: surveyReducer,
};

export const getSurveyName = (state: AppState) => state.survey.name;
export const getSurveyDescription = (state: AppState) => state.survey.description;

export const getSurveyPages = (state: AppState) => state.survey.pages;
export const getSurveyPageSize = (state: AppState) => state.survey.pages.size;

export const getOptionAnswers = (state: AppState, { pageId, elementId }) =>
  state.survey.pages.get(pageId).elements.get(elementId).question.optionAnswers;

export const getElementsSize = (state: AppState, { pageId }) => state.survey.pages.get(pageId).elements.size;
export const getElementsByPageId = (state: AppState, { pageId }) => state.survey.pages.get(pageId).elements;
