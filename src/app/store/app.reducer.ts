import {AppState} from './app.state';
import * as fromSurvey from './survey/survey.reducer';
import * as fromPages from './pages/pages.reducer';
import * as fromElements from './elements/elements.reducer';
import * as fromOptionAnswers from './option-answers/option-answers.reducer';


export const reducers = {
  survey: fromSurvey.reducer,
  pages: fromPages.reducer,
  elements: fromElements.reducer,
  optionAnswers: fromOptionAnswers.reducer,
};

// Survey Selectors
export const getSurveyName = (state: AppState) => state.survey.name;
export const getSurveyDescription = (state: AppState) => state.survey.description;
export const getSurveyId = (state: AppState) => state.survey.id;

// Pages Selectors
export const getPagesBySurveyId = (state: AppState, { surveyId }) => state.pages.get(surveyId);
export const getSurveyPageSize = (state: AppState, { surveyId }) => state.pages.get(surveyId).size;

// Elements Selectors
export const getElementsByPageId = (state: AppState, { pageId }) => state.elements.get(pageId);
export const getElementsSize = (state: AppState, { pageId }) => state.elements.get(pageId).size;

// Option Answers Selectors
export const getOptionAnswers = (state: AppState, { elementId }) =>
  state.optionAnswers.get(elementId);

