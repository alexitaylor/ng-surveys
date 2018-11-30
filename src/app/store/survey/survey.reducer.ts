import {SurveyActions, SurveyActionTypes} from './survey.actions';
import {AngularSurvey, IAngularSurvey} from '../../models/angular-survey.model';
import {IPage, IPageMap} from '../../models/page.model';
import * as utils from '../utils';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';
import {debug} from 'util';

export const appInitialState = new AngularSurvey(
  UUID.UUID(),
  '',
);

export function surveyReducer(state = appInitialState, action: SurveyActions): IAngularSurvey {

  switch (action.type) {

    case SurveyActionTypes.SURVEY_NAME_CHANGED_ACTION: {
      return Object.assign(state, _.cloneDeep(state), {
        ...action.payload
      });
    }

    case SurveyActionTypes.SURVEY_DESCRIPTION_CHANGED_ACTION: {
      return Object.assign(state, _.cloneDeep(state), {
        ...action.payload
      });
    }

    case SurveyActionTypes.SURVEY_ADD_PAGE_ACTION: {
      const pages: IPageMap = utils.createNextPage(state.pages);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_INSERT_PAGE_ACTION: {
      const { previousPageId } = action.payload;
      const pages: IPageMap = utils.insertPage(state, state.pages, previousPageId);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_REMOVE_PAGE_ACTION: {
      const { pageId } = action.payload;
      const pages: IPageMap = utils.removePage(state.pages, pageId);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_UPDATE_PAGE_NAME_ACTION: {
      const { pageId, name } = action.payload;
      const pages: IPageMap = utils.updatePageName(state.pages, pageId, name);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_UPDATE_PAGE_DESCRIPTION_ACTION: {
      const { pageId, description } = action.payload;
      const pages: IPageMap = utils.updatePageDescription(state.pages, pageId, description);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_UPDATE_PAGE_PAGE_FLOW_ACTION: {
      const { pageId, pageFlow } = action.payload;
      const pages: IPageMap = utils.updatePagePageFlow(state.pages, pageId, pageFlow);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_ADD_ELEMENT_ACTION: {
      const { pageId } = action.payload;
      const pages: IPageMap = utils.createNextElement(state.pages, pageId);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_REMOVE_ELEMENT_ACTION: {
      const { pageId, elementId } = action.payload;
      const pages: IPageMap = utils.removeElement(state.pages, pageId, elementId);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_ADD_TEXT_ACTION: {
      const { pageId, elementId, text } = action.payload;
      const pages: IPageMap = utils.addQuestionText(state.pages, pageId, elementId, text);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_ADD_TYPE_ACTION: {
      const { pageId, elementId, type } = action.payload;
      const pages: IPageMap = utils.addQuestionType(state.pages, pageId, elementId, type);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_UPDATE_MIN_ACTION: {
      const { pageId, elementId, min } = action.payload;
      const pages: IPageMap = utils.updateQuestionMin(state.pages, pageId, elementId, min);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_UPDATE_MAX_ACTION: {
      const { pageId, elementId, max } = action.payload;
      const pages: IPageMap = utils.updateQuestionMax(state.pages, pageId, elementId, max);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_REMOVE_MIN_MAX_ACTION: {
      const { pageId, elementId } = action.payload;
      const pages: IPageMap = utils.removeQuestionMinAndMax(state.pages, pageId, elementId);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_UPDATE_PAGE_FLOW_MODIFIER_ACTION: {
      const { pageId, elementId, pageFlowModifier } = action.payload;
      const pages: IPageMap = utils.updateQuestionPageFlowModifier(state.pages, pageId, elementId, pageFlowModifier);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_ADD_OPTION_ANSWERS_ACTION: {
      const { pageId, elementId } = action.payload;
      const pages: IPageMap = utils.addOptionAnswer(state.pages, pageId, elementId);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_REMOVE_OPTION_ANSWERS_ACTION: {
      const { pageId, elementId, optionAnswerId } = action.payload;
      const pages: IPageMap = utils.removeOptionAnswer(state.pages, pageId, elementId, optionAnswerId);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_ADD_OPTION_ANSWERS_VALUE_ACTION: {
      const { pageId, elementId, optionAnswerId, value } = action.payload;
      const pages: IPageMap = utils.addOptionAnswerValue(state.pages, pageId, elementId, optionAnswerId, value);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    case SurveyActionTypes.SURVEY_QUESTION_UPDATE_OPTION_ANSWERS_PAGE_FLOW: {
      const { pageId, elementId, optionAnswerId, pageFlow } = action.payload;
      const pages: IPageMap = utils.updateOptionAnswerPageFlow(state.pages, pageId, elementId, optionAnswerId, pageFlow);

      return Object.assign(state, _.cloneDeep(state), _.cloneDeep(pages));
    }

    default: {
      return state;
    }
  }
}
