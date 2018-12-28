import {NgxSurveyState} from './ngx-survey.state';

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

// Builder Options Selectors
export const getBuilderOptions = (state: NgxSurveyState) => state.builderOptions;

