import * as page from './pages.actions';
import * as pageUtils from './pages-util';
import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {NgxSurveyStore} from '../ngx-survey.store';
import {CustomAction, IPageMap} from '../../models';

@Injectable()
export class PagesReducer {

  constructor(private _ngxSurveyStore: NgxSurveyStore) {}

  pagesReducer(action: CustomAction) {
    const state: IPageMap = this._ngxSurveyStore.dataStore.pages;

    switch (action.type) {

      case page.PagesActionTypes.ADD_PAGE_ACTION: {
        const { surveyId, pageId } = action.payload;
        const prevPages: IPageMap = state;
        const pages: IPageMap = pageUtils.createNextPage(prevPages, surveyId, pageId);
        const newState = _.cloneDeep(pages);
        console.log('newState: ', newState);
        this._ngxSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.INSERT_PAGE_ACTION: {
        const { previousPageId, surveyId, pageId } = action.payload;
        const pages: IPageMap = pageUtils.insertPage(state, previousPageId, surveyId, pageId);
        const newState = _.cloneDeep(pages);

        this._ngxSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.MOVE_PAGE_UP_ACTION: {
        const { pageId } = action.payload;
        const pages: IPageMap = pageUtils.movePageUp(state, pageId);
        const newState = _.cloneDeep(pages);

        this._ngxSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.MOVE_PAGE_DOWN_ACTION: {
        const { pageId } = action.payload;
        const pages: IPageMap = pageUtils.movePageDown(state, pageId);
        const newState = _.cloneDeep(pages);

        this._ngxSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.REMOVE_PAGE_ACTION: {
        const { pageId } = action.payload;
        const pages: IPageMap = pageUtils.removePage(state, pageId);
        const newState = _.cloneDeep(pages);

        this._ngxSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.UPDATE_PAGE_NAME_ACTION: {
        const { pageId, name } = action.payload;
        const pages: IPageMap = pageUtils.updatePageName(state, pageId, name);
        const newState = _.cloneDeep(pages);

        this._ngxSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.UPDATE_PAGE_DESCRIPTION_ACTION: {
        const { pageId, description } = action.payload;
        const pages: IPageMap = pageUtils.updatePageDescription(state, pageId, description);
        const newState = _.cloneDeep(pages);

        this._ngxSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.UPDATE_PAGE_PAGE_FLOW_ACTION: {
        const { pageId, pageFlow } = action.payload;
        const pages: IPageMap = pageUtils.updatePagePageFlow(state, pageId, pageFlow);
        const newState = _.cloneDeep(pages);

        this._ngxSurveyStore.updatePages(newState);
        break;
      }

      case page.PagesActionTypes.RESET_PAGE_STATE: {
        const { ngxSurveyState } = action.payload;
        this._ngxSurveyStore.updatePages(Object.assign(ngxSurveyState.pages));
        break;
      }

      case page.PagesActionTypes.IMPORT_PAGE_STATE: {
        const { ngxSurveyState } = action.payload;
        this._ngxSurveyStore.updatePages(Object.assign(ngxSurveyState.pages));
        break;
      }

      default: {
        return state;
      }
    }
  }
}
