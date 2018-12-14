import { Action } from '@ngrx/store';
import {IBuilderOptions} from '../../models';

export enum BuilderOptionsActionTypes {
  UPDATE_BUILDER_OPTIONS_ACTION = '[Builder Options] Update builder options',
  RESET_BUILDER_OPTIONS_ACTION = '[Builder Options] Reset builder options',
}

export class UpdateBuilderOptionsAction implements Action {
  readonly type = BuilderOptionsActionTypes.UPDATE_BUILDER_OPTIONS_ACTION;
  constructor(public payload: { builderOptions: IBuilderOptions}) { }
}

export class ResetBuilderOptionsAction implements Action {
  readonly type = BuilderOptionsActionTypes.RESET_BUILDER_OPTIONS_ACTION;
  constructor(public payload: { builderOptions: IBuilderOptions}) { }
}

export type BuilderOptionsActions =
  UpdateBuilderOptionsAction |
  ResetBuilderOptionsAction;
