import * as page from './pages.actions';
import {IPageMap, IPageMapMap} from '../../models/page.model';
import * as pageUtils from './pages-util';
import * as _ from 'lodash';
import {appInitialState} from '../app.state';

export function reducer(state = appInitialState.pages, action: page.Actions): IPageMapMap {

  switch (action.type) {

    case page.PagesActionTypes.ADD_PAGE_ACTION: {
      const { surveyId, pageId } = action.payload;
      const pagesPrev = state.get(surveyId);
      const pages: IPageMap = pageUtils.createNextPage(pagesPrev, surveyId, pageId);

      state.set(surveyId, pages);

      return Object.assign(state, _.cloneDeep(state));
    }

    case page.PagesActionTypes.INSERT_PAGE_ACTION: {
      const { previousPageId, surveyId, pageId } = action.payload;
      const pagesPrev = state.get(surveyId);
      const pages: IPageMap = pageUtils.insertPage(pagesPrev, previousPageId, surveyId, pageId);

      state.set(surveyId, pages);

      return Object.assign(state, _.cloneDeep(state));
    }

    case page.PagesActionTypes.MOVE_PAGE_UP_ACTION: {
      const { pageId, surveyId } = action.payload;
      const pagesPrev = state.get(surveyId);
      const pages: IPageMap = pageUtils.movePageUp(pagesPrev, pageId);

      state.set(surveyId, pages);

      return Object.assign(state, _.cloneDeep(state));
    }

    case page.PagesActionTypes.MOVE_PAGE_DOWN_ACTION: {
      const { pageId, surveyId } = action.payload;
      const pagesPrev = state.get(surveyId);
      const pages: IPageMap = pageUtils.movePageDown(pagesPrev, pageId);

      state.set(surveyId, pages);

      return Object.assign(state, _.cloneDeep(state));
    }

    case page.PagesActionTypes.REMOVE_PAGE_ACTION: {
      const { pageId, surveyId } = action.payload;
      const pagesPrev = state.get(surveyId);
      const pages: IPageMap = pageUtils.removePage(pagesPrev, pageId);

      state.set(surveyId, pages);

      return Object.assign(state, _.cloneDeep(state));
    }

    case page.PagesActionTypes.UPDATE_PAGE_NAME_ACTION: {
      const { pageId, name, surveyId } = action.payload;

      const pagesPrev = state.get(surveyId);
      const pages: IPageMap = pageUtils.updatePageName(pagesPrev, pageId, name);

      state.set(surveyId, pages);

      return Object.assign(state, _.cloneDeep(state));
    }

    case page.PagesActionTypes.UPDATE_PAGE_DESCRIPTION_ACTION: {
      const { pageId, description, surveyId } = action.payload;
      const pagesPrev = state.get(surveyId);
      const pages: IPageMap = pageUtils.updatePageDescription(pagesPrev, pageId, description);

      state.set(surveyId, pages);

      return Object.assign(state, _.cloneDeep(state));
    }

    case page.PagesActionTypes.UPDATE_PAGE_PAGE_FLOW_ACTION: {
      const { pageId, pageFlow, surveyId } = action.payload;
      const pagesPrev = state.get(surveyId);
      const pages: IPageMap = pageUtils.updatePagePageFlow(pagesPrev, pageId, pageFlow);

      state.set(surveyId, pages);

      return Object.assign(state, _.cloneDeep(state));
    }

    case page.PagesActionTypes.RESET_PAGE_STATE: {
      const { appState } = action.payload;
      return Object.assign(appState.pages);
    }

    default: {
      return state;
    }
  }
}
