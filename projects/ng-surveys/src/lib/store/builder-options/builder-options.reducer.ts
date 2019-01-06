import {BuilderOptionsActionTypes} from './builder-options.actions';
import {CustomAction, IBuilderOptions} from '../../models';
import { deepCopy } from '../utils';
import {Injectable} from '@angular/core';
import {NgSurveyStore} from '../ng-survey.store';

@Injectable()
export class BuilderOptionsReducer {

  constructor(private _ngSurveyStore: NgSurveyStore) {
  }

  builderOptionsReducer(action: CustomAction) {
    const state: IBuilderOptions = this._ngSurveyStore.dataStore.builderOptions;

    switch (action.type) {
      case BuilderOptionsActionTypes.UPDATE_BUILDER_OPTIONS_ACTION: {
        const newState = Object.assign(deepCopy(state), {
          ...action.payload.builderOptions
        });

        this._ngSurveyStore.updateBuilderOptions(newState);
        break;
      }

      case BuilderOptionsActionTypes.RESET_BUILDER_OPTIONS_ACTION: {
        const newState = Object.assign(deepCopy(state), {
          ...action.payload.builderOptions
        });

        this._ngSurveyStore.updateBuilderOptions(newState);
        break;
      }

      default: {
        return state;
      }
    }
  }
}
