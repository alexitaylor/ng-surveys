import {BuilderOptionsActionTypes} from './builder-options.actions';
import {CustomAction, IBuilderOptions} from '../../models';
import { deepCopy } from '../utils';
import {Injectable} from '@angular/core';
import {NgxSurveyStore} from '../ngx-survey.store';

@Injectable()
export class BuilderOptionsReducer {

  constructor(private _ngxSurveyStore: NgxSurveyStore) {
  }

  builderOptionsReducer(action: CustomAction) {
    const state: IBuilderOptions = this._ngxSurveyStore.dataStore.builderOptions;

    switch (action.type) {
      case BuilderOptionsActionTypes.UPDATE_BUILDER_OPTIONS_ACTION: {
        const newState = Object.assign(deepCopy(state), {
          ...action.payload.builderOptions
        });

        this._ngxSurveyStore.updateBuilderOptions(newState);
        break;
      }

      case BuilderOptionsActionTypes.RESET_BUILDER_OPTIONS_ACTION: {
        const newState = Object.assign(deepCopy(state), {
          ...action.payload.builderOptions
        });

        this._ngxSurveyStore.updateBuilderOptions(newState);
        break;
      }

      default: {
        return state;
      }
    }
  }
}
