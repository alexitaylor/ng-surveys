import * as elements from './elements.actions';
import * as elementUtils from './elements-util';
import * as _ from 'lodash';
import {appInitialState} from '../ngx-survey.state';
import {IElementsMap, IElementsMapMap} from '../../models/elements.model';

export function reducer(state = appInitialState.elements, action: elements.Actions): IElementsMapMap {

  switch (action.type) {

    case elements.ElementsActionTypes.ADD_ELEMENT_ACTION: {
      const { pageId } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      let newElements: IElementsMap;

      if (!prevElements) {
        newElements = elementUtils.createNewElementMap(pageId);
      } else {
        newElements = elementUtils.createNextElement(pageId, prevElements);
      }

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.REMOVE_ELEMENT_ACTION: {
      const { pageId, elementId } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.removeElement(elementId, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.REMOVE_ELEMENT_MAP_ACTION: {
      const { pageId } = action.payload;
      state.delete(pageId);
      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.MOVE_ELEMENT_UP_ACTION: {
      const { pageId, elementId } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.moveElementUp(elementId, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.MOVE_ELEMENT_DOWN_ACTION: {
      const { pageId, elementId } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.moveElementDown(elementId, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.DRAG_ELEMENT_ACTION: {
      const { pageId, startIndex, endIndex } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.dragElement(startIndex, endIndex, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.QUESTION_ADD_TEXT_ACTION: {
      const { pageId, elementId, text } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.addQuestionText(elementId, text, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.QUESTION_ADD_TYPE_ACTION: {
      const { pageId, elementId, type } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.addQuestionType(elementId, type, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.QUESTION_UPDATE_MIN_ACTION: {
      const { pageId, elementId, min } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.updateQuestionMin(elementId, min, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.QUESTION_UPDATE_MAX_ACTION: {
      const { pageId, elementId, max } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.updateQuestionMax(elementId, max, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.QUESTION_REMOVE_VALUES_ACTION: {
      const { pageId, elementId } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.removeQuestionValues(elementId, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.QUESTION_UPDATE_PAGE_FLOW_MODIFIER_ACTION: {
      const { pageId, elementId, pageFlowModifier } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.updateQuestionPageFlowModifier(elementId, pageFlowModifier, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.TOGGLE_IS_ACTIVE_ELEMENT_ACTION: {
      const { pageId, elementId, isSaved } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.toggleElementIsSaved(elementId, isSaved, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.QUESTION_UPDATE_ANSWER_ACTION: {
      const { pageId, elementId, answer } = action.payload;
      const prevElements: IElementsMap = state.get(pageId);
      const newElements: IElementsMap = elementUtils.updateQuestionAnswer(elementId, answer, prevElements);

      state.set(pageId, newElements);

      return Object.assign(state, _.cloneDeep(state));
    }

    case elements.ElementsActionTypes.RESET_ELEMENTS_STATE: {
      const { ngxSurveyState } = action.payload;
      return Object.assign(ngxSurveyState.elements);
    }

    default: {
      return state;
    }
  }
}
