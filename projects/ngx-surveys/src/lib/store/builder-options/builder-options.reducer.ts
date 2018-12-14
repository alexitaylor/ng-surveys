import {BuilderOptionsActionTypes, BuilderOptionsActions} from './builder-options.actions';
import {IBuilderOptions} from '../../models';
import * as _ from 'lodash';
import {appInitialState} from '../ngx-survey.state';

export function reducer(state = appInitialState.builderOptions, action: BuilderOptionsActions): IBuilderOptions {

  switch (action.type) {

    case BuilderOptionsActionTypes.UPDATE_BUILDER_OPTIONS_ACTION: {
      return Object.assign(_.cloneDeep(state), {
        ...action.payload.builderOptions
      });
    }

    case BuilderOptionsActionTypes.RESET_BUILDER_OPTIONS_ACTION: {
      return Object.assign(_.cloneDeep(state), {
        ...action.payload.builderOptions
      });
    }

    default: {
      return state;
    }
  }
}
