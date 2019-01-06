import * as page from './pages.actions';
import * as pageUtils from './pages-util';
import { deepCopy } from '../utils';
import {Injectable} from '@angular/core';
import {NgSurveyStore} from '../ng-survey.store';
import {CustomAction, IPageMap} from '../../models';
import {ElementsReducer} from '../elements/elements.reducer';
import {ElementsActionTypes} from '../elements/elements.actions';

@Injectable()
export class PagesReducer {

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private _elementsReducer: ElementsReducer
  ) {}

  pagesReducer(action: CustomAction) {
    const state: IPageMap = this._ngSurveyStore.dataStore.pages;

    switch (action.type) {

      case page.PagesActionTypes.ADD_PAGE_ACTION: {
        const { surveyId, pageId } = action.payload;
        const prevPages: IPageMap = state;
        const pages: IPageMap = pageUtils.createNextPage(prevPages, surveyId, pageId);
        const newState = deepCopy(pages);
        this._ngSurveyStore.updatePages(newState);

        // Effects
        this._elementsReducer.elementsReducer({
          type: ElementsActionTypes.ADD_ELEMENT_ACTION,
          payload: { pageId: pageId, type: 'question' }
        });

        break;
      }

      case page.PagesActionTypes.INSERT_PAGE_ACTION: {
        const { previousPageId, surveyId, pageId } = action.payload;
        const pages: IPageMap = pageUtils.insertPage(state, previousPageId, surveyId, pageId);
        const newState = deepCopy(pages);
        this._ngSurveyStore.updatePages(newState);

        // Effects
        this._elementsReducer.elementsReducer({
          type: ElementsActionTypes.ADD_ELEMENT_ACTION,
          payload: { pageId: pageId, type: 'question' }
        });

        break;
      }

      case page.PagesActionTypes.MOVE_PAGE_UP_ACTION: {
        const { pageId } = action.payload;
        const pages: IPageMap = pageUtils.movePageUp(state, pageId);
        const newState = deepCopy(pages);

        this._ngSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.MOVE_PAGE_DOWN_ACTION: {
        const { pageId } = action.payload;
        const pages: IPageMap = pageUtils.movePageDown(state, pageId);
        const newState = deepCopy(pages);

        this._ngSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.REMOVE_PAGE_ACTION: {
        const { pageId, elementIds } = action.payload;
        const pages: IPageMap = pageUtils.removePage(state, pageId);
        const newState = deepCopy(pages);
        this._ngSurveyStore.updatePages(newState);

        // Effects
        this._elementsReducer.elementsReducer({
          type: ElementsActionTypes.REMOVE_ELEMENT_MAP_ACTION,
          payload: { pageId, elementIds }
        });

        break;
      }

      case page.PagesActionTypes.UPDATE_PAGE_NAME_ACTION: {
        const { pageId, name } = action.payload;
        const pages: IPageMap = pageUtils.updatePageName(state, pageId, name);
        const newState = deepCopy(pages);

        this._ngSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.UPDATE_PAGE_DESCRIPTION_ACTION: {
        const { pageId, description } = action.payload;
        const pages: IPageMap = pageUtils.updatePageDescription(state, pageId, description);
        const newState = deepCopy(pages);

        this._ngSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.UPDATE_PAGE_PAGE_FLOW_ACTION: {
        const { pageId, pageFlow } = action.payload;
        const pages: IPageMap = pageUtils.updatePagePageFlow(state, pageId, pageFlow);
        const newState = deepCopy(pages);

        this._ngSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.RESET_PAGE_STATE: {
        const { ngSurveyState } = action.payload;
        this._ngSurveyStore.updatePages(Object.assign(ngSurveyState.pages));
        break;
      }

      case page.PagesActionTypes.IMPORT_PAGE_STATE: {
        const { ngSurveyState } = action.payload;
        this._ngSurveyStore.updatePages(Object.assign(ngSurveyState.pages));
        break;
      }

      default: {
        return state;
      }
    }
  }
}
