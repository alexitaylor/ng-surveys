import {ActionReducerMap, createSelector, select} from '@ngrx/store';
import {AppState} from './app.state';
import {surveyReducer} from './survey/survey.reducer';
import {IPage, IPageMap} from '../models/page.model';


export const reducers: ActionReducerMap<AppState> = {
  survey: surveyReducer,
};

export const getSurveyName = (state: AppState) => state.survey.name;
export const getSurveyDescription = (state: AppState) => state.survey.description;
export const getSurveyPages = (state: AppState) => state.survey.pages;
export const getSurveyPageSize = (state: AppState) => state.survey.pages.size;
export const getElementsByPageId = (state: AppState, { pageId }) => state.survey.pages.get(pageId).elements;

// export const getElementsByPageId = createSelector(select(getSurveyPages), (pages: IPageMap, { pageId }) => pages.get(pageId).elements);

// TODO page size
