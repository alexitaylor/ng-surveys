import * as elements from './elements.actions';
import * as elementUtils from './elements-util';
import {IElementsMap, IElementsMaps} from '../../models/elements.model';
import {Injectable} from '@angular/core';
import {NgSurveyStore} from '../ng-survey.store';
import {CustomAction} from '../../models';
import {OptionAnswersReducer} from '../option-answers/option-answers.reducer';
import {OptionAnswersActionTypes} from '../option-answers/option-answers.actions';
import {PagesReducer} from '../pages/pages.reducer';
import {PagesActionTypes} from '../pages/pages.actions';
import {isNil} from '../utils';

@Injectable()
export class ElementsReducer {

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private _optionAnswersReducer: OptionAnswersReducer,
    // private _pagesReducer: PagesReducer,
  ) {}

  elementsReducer(action: CustomAction) {
    const state: IElementsMaps = this._ngSurveyStore.dataStore.elements;

    switch (action.type) {
      case elements.ElementsActionTypes.ADD_ELEMENT_ACTION: {
        const { pageId, type } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        let newElements: IElementsMap;

        if (!prevElements) {
          newElements = elementUtils.createNewElementMap(pageId, type);
        } else {
          newElements = elementUtils.createNextElement(pageId, prevElements, type);
        }

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.REMOVE_ELEMENT_ACTION: {
        const { pageId, elementId } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.removeElement(elementId, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);

        // Effect
        this._optionAnswersReducer.optionAnswersReducer({
          type: OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_MAP_ACTION,
          payload: { elementId }
        });

        break;
      }

      case elements.ElementsActionTypes.REMOVE_ELEMENT_MAP_ACTION: {
        const { pageId, elementIds } = action.payload;
        state.delete(pageId);
        this._ngSurveyStore.updateElements(state);

        // Effect
        this._optionAnswersReducer.optionAnswersReducer({
          type: OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_MAPS_ACTION,
          payload: { elementIds }
        });

        break;
      }

      case elements.ElementsActionTypes.MOVE_ELEMENT_UP_ACTION: {
        const { pageId, elementId } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.moveElementUp(elementId, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.MOVE_ELEMENT_DOWN_ACTION: {
        const { pageId, elementId } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.moveElementDown(elementId, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.DRAG_ELEMENT_ACTION: {
        const { pageId, startIndex, endIndex } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.dragElement(startIndex, endIndex, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.QUESTION_ADD_TEXT_ACTION: {
        const { pageId, elementId, text } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.addQuestionText(elementId, text, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.QUESTION_ADD_TYPE_ACTION: {
        const { pageId, elementId, type } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.addQuestionType(elementId, type, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);

        // Effects
        if (type === 'radio' || type === 'checkboxes' || type === 'select') {
          this._optionAnswersReducer.optionAnswersReducer({
            type: OptionAnswersActionTypes.ADD_OPTION_ANSWERS_ACTION,
            payload: { elementId }
          });
        }

        break;
      }

      case elements.ElementsActionTypes.QUESTION_UPDATE_MIN_ACTION: {
        const { pageId, elementId, min } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.updateQuestionMin(elementId, min, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.QUESTION_UPDATE_MAX_ACTION: {
        const { pageId, elementId, max } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.updateQuestionMax(elementId, max, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.QUESTION_REMOVE_VALUES_ACTION: {
        const { pageId, elementId } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.removeQuestionValues(elementId, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.QUESTION_UPDATE_PAGE_FLOW_MODIFIER_ACTION: {
        const { pageId, elementId, pageFlowModifier } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.updateQuestionPageFlowModifier(elementId, pageFlowModifier, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.TOGGLE_IS_ACTIVE_ELEMENT_ACTION: {
        const { pageId, elementId, isSaved } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.toggleElementIsSaved(elementId, isSaved, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);

        // Effect
        this._optionAnswersReducer.optionAnswersReducer({
          type: OptionAnswersActionTypes.TOGGLE_IS_ACTIVE_OPTION_ANSWERS_ACTION,
          payload: { elementId, isSaved }
        });

        break;
      }

      case elements.ElementsActionTypes.QUESTION_UPDATE_ANSWER_ACTION: {
        const { pageId, elementId, answer, pageFlowModifier, pageFlow } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.updateQuestionAnswer(elementId, answer, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);

        // Effect
        if (pageFlowModifier) {
          // this._pagesReducer.pagesReducer({
          //   type: PagesActionTypes.UPDATE_PAGE_PAGE_FLOW_ACTION,
          //   payload: { pageId, pageFlow }
          // });
        }

        break;
      }

      case elements.ElementsActionTypes.PARAGRAPH_UPDATE_HTML_ACTION: {
        const { pageId, elementId, html } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.updateParagraphHTML(elementId, html, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      case elements.ElementsActionTypes.RESET_ELEMENTS_STATE: {
        const { ngSurveyState } = action.payload;
        this._ngSurveyStore.updateElements(ngSurveyState.elements);
        break;
      }

      case elements.ElementsActionTypes.IMPORT_ELEMENTS_STATE: {
        const { ngSurveyState } = action.payload;
        this._ngSurveyStore.updateElements(ngSurveyState.elements);
        break;
      }

      case elements.ElementsActionTypes.IMPORT_ELEMENT: {
        const { element, pageId, currentElement, newOptionAnswers, elementId, optionAnswers } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.importElement(element, pageId, prevElements, currentElement);

        state.set(pageId, newElements);
        this._ngSurveyStore.updateElements(state);

        // Effect
        if (!isNil(optionAnswers)) {
          this._optionAnswersReducer.optionAnswersReducer({
            type: OptionAnswersActionTypes.IMPORT_OPTION_ANSWERS,
            payload: { newOptionAnswers, elementId }
          });
        }

        break;
      }

      case elements.ElementsActionTypes.CLONE_ELEMENT_ACTION: {
        const { pageId, elementId } = action.payload;
        const prevElements: IElementsMap = state.get(pageId);
        const newElements: IElementsMap = elementUtils.cloneElement(elementId, prevElements);

        state.set(pageId, newElements);

        this._ngSurveyStore.updateElements(state);
        break;
      }

      default: {
        return state;
      }
    }
  }
}
