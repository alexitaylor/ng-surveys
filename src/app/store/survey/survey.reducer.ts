import {SurveyActions, SurveyActionTypes} from './survey.actions';
import {AngularSurvey, IAngularSurvey} from '../../models/angular-survey.model';
import {IPage, IPageMap} from '../../models/page.model';
import * as utils from '../utils';
import { UUID } from 'angular2-uuid';

export const appInitialState = new AngularSurvey(
  UUID.UUID(),
  '',
);

export function surveyReducer(state = appInitialState, action: SurveyActions): IAngularSurvey {

  switch (action.type) {

    case SurveyActionTypes.SURVEY_NAME_CHANGED_ACTION: {
      return Object.assign(state, {
        ...state,
        name: action.payload
      });
    }

    case SurveyActionTypes.SURVEY_DESCRIPTION_CHANGED_ACTION: {
      return Object.assign(state, {
        ...state,
        description: action.payload
      });
    }

    case SurveyActionTypes.SURVEY_ADD_PAGE_ACTION: {
      const pages: IPageMap = utils.createNextPage(state.pages);

      return Object.assign(state, {
        ...state,
        pages,
      });
    }

    case SurveyActionTypes.SURVEY_REMOVE_PAGE_ACTION: {
      const id = action.payload;
      const pages: IPageMap = utils.removePage(state.pages, id);

      return Object.assign(state, {
        ...state,
        pages,
      });
    }

    case SurveyActionTypes.SURVEY_ADD_ELEMENT_ACTION: {
      const pageId = action.payload;
      const pages: IPageMap = utils.createNextElement(state.pages, pageId);

      return Object.assign(state, {
        ...state,
        pages,
      });
    }

    case SurveyActionTypes.SURVEY_REMOVE_ELEMENT_ACTION: {
      const { pageId, elementId } = action.payload;
      const pages: IPageMap = utils.removeElement(state.pages, pageId, elementId);

      return Object.assign(state, {
        ...state,
        pages,
      });
    }

    case SurveyActionTypes.SURVEY_QUESTION_ADD_TEXT_ACTION: {
      const { pageId, elementId, text } = action.payload;
      console.log('action.payload: ', action.payload);
      const pages: IPageMap = utils.addQuestionText(state.pages, pageId, elementId, text);

      return Object.assign(state, {
        ...state,
        pages,
      });
    }

    case SurveyActionTypes.SURVEY_QUESTION_ADD_TYPE_ACTION: {
      const { pageId, elementId, type } = action.payload;
      const pages: IPageMap = utils.addQuestionType(state.pages, pageId, elementId, type);

      return Object.assign(state, {
        ...state,
        pages,
      });
    }

    default: {
      return state;
    }
  }
}
