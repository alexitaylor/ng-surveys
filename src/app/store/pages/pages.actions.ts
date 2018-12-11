import { Action } from '@ngrx/store';
import {IPageFlow} from '../../models/page-flow.model';
import {AppState} from '../app.state';

export enum PagesActionTypes {
  ADD_PAGE_ACTION = '[Angular Page] Add survey page',
  INSERT_PAGE_ACTION = '[Angular Page] Insert survey page',
  MOVE_PAGE_UP_ACTION = '[Angular Page] Move survey page up',
  MOVE_PAGE_DOWN_ACTION = '[Angular Page] Move survey page down',
  REMOVE_PAGE_ACTION = '[Angular Page] Remove survey page',
  UPDATE_PAGE_NAME_ACTION = '[Angular Page] Update survey page name',
  UPDATE_PAGE_DESCRIPTION_ACTION = '[Angular Page] Update survey page description',
  UPDATE_PAGE_PAGE_FLOW_ACTION = '[Angular Page] Update survey page page flow',
  RESET_PAGE_STATE = '[Angular Page] Reset page state'
}

export class AddPageAction implements Action {
  readonly type = PagesActionTypes.ADD_PAGE_ACTION;
  constructor(public payload?: { surveyId: string, pageId: string }) { }
}

export class InsertPageAction implements Action {
  readonly type = PagesActionTypes.INSERT_PAGE_ACTION;
  constructor(public payload?: { previousPageId: string, surveyId: string, pageId }) { }
}

export class MovePageUpAction implements Action {
  readonly type = PagesActionTypes.MOVE_PAGE_UP_ACTION;
  constructor(public payload?: { pageId: string, surveyId: string }) { }
}

export class MovePageDownAction implements Action {
  readonly type = PagesActionTypes.MOVE_PAGE_DOWN_ACTION;
  constructor(public payload?: { pageId: string, surveyId: string }) { }
}

export class RemovePageAction implements Action {
  readonly type = PagesActionTypes.REMOVE_PAGE_ACTION;
  constructor(public payload: { pageId: string, surveyId: string, elementIds: string[] | any }) { }
}

export class UpdatePageNameAction implements Action {
  readonly type = PagesActionTypes.UPDATE_PAGE_NAME_ACTION;
  constructor(public payload: { pageId: string,  name: string, surveyId: string }) { }
}

export class UpdatePageDescriptionAction implements Action {
  readonly type = PagesActionTypes.UPDATE_PAGE_DESCRIPTION_ACTION;
  constructor(public payload: { pageId: string,  description: string, surveyId: string }) { }
}

export class UpdatePagePageFlowAction implements Action {
  readonly type = PagesActionTypes.UPDATE_PAGE_PAGE_FLOW_ACTION;
  constructor(public payload: { pageId: string,  pageFlow: IPageFlow, surveyId: string }) { }
}

export class ResetPageStateAction implements Action {
  readonly type = PagesActionTypes.RESET_PAGE_STATE;
  constructor(public payload: { appState: AppState }) { }
}

export type Actions =
  AddPageAction |
  InsertPageAction |
  MovePageUpAction |
  MovePageDownAction |
  RemovePageAction |
  UpdatePageNameAction |
  UpdatePageDescriptionAction |
  UpdatePagePageFlowAction |
  ResetPageStateAction;
