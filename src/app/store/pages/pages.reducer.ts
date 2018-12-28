import * as page from './pages.actions';
import {IPageMap} from '../../models/page.model';
import * as pageUtils from './pages-util';
import * as _ from 'lodash';
import {appInitialState} from '../ngx-survey.state';

export function reducer(state = appInitialState.pages, action: page.Actions): IPageMap {

  switch (action.type) {

    case page.PagesActionTypes.ADD_PAGE_ACTION: {
      const { surveyId, pageId } = action.payload;
      const prevPages: IPageMap = state;
      const pages: IPageMap = pageUtils.createNextPage(prevPages, surveyId, pageId);

      return _.cloneDeep(pages);
    }

    case page.PagesActionTypes.INSERT_PAGE_ACTION: {
      const { previousPageId, surveyId, pageId } = action.payload;
      const pages: IPageMap = pageUtils.insertPage(state, previousPageId, surveyId, pageId);

      return _.cloneDeep(pages);
    }

    case page.PagesActionTypes.MOVE_PAGE_UP_ACTION: {
      const { pageId } = action.payload;
      const pages: IPageMap = pageUtils.movePageUp(state, pageId);

      return _.cloneDeep(pages);
    }

    case page.PagesActionTypes.MOVE_PAGE_DOWN_ACTION: {
      const { pageId } = action.payload;
      const pages: IPageMap = pageUtils.movePageDown(state, pageId);

      return _.cloneDeep(pages);
    }

    case page.PagesActionTypes.REMOVE_PAGE_ACTION: {
      const { pageId } = action.payload;
      const pages: IPageMap = pageUtils.removePage(state, pageId);

      return _.cloneDeep(pages);
    }

    case page.PagesActionTypes.UPDATE_PAGE_NAME_ACTION: {
      const { pageId, name } = action.payload;
      const pages: IPageMap = pageUtils.updatePageName(state, pageId, name);

      return _.cloneDeep(pages);
    }

    case page.PagesActionTypes.UPDATE_PAGE_DESCRIPTION_ACTION: {
      const { pageId, description } = action.payload;
      const pages: IPageMap = pageUtils.updatePageDescription(state, pageId, description);

      return _.cloneDeep(pages);
    }

    case page.PagesActionTypes.UPDATE_PAGE_PAGE_FLOW_ACTION: {
      const { pageId, pageFlow } = action.payload;
      const pages: IPageMap = pageUtils.updatePagePageFlow(state, pageId, pageFlow);

      return _.cloneDeep(pages);
    }

    case page.PagesActionTypes.RESET_PAGE_STATE: {
      const { ngxSurveyState } = action.payload;
      return Object.assign(ngxSurveyState.pages);
    }

    case page.PagesActionTypes.IMPORT_PAGE_STATE: {
      const { ngxSurveyState } = action.payload;
      console.log('ngxSurveyState: ', ngxSurveyState);
      return Object.assign(ngxSurveyState.pages);
    }

    default: {
      return state;
    }
  }
}
