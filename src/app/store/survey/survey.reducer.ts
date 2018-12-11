import {SurveyActions, SurveyActionTypes} from './survey.actions';
import {IAngularSurvey} from '../../models/angular-survey.model';
import * as _ from 'lodash';
import {appInitialState} from '../app.state';

export function reducer(state = appInitialState.survey, action: SurveyActions): IAngularSurvey {

  switch (action.type) {

    case SurveyActionTypes.SURVEY_NAME_CHANGED_ACTION: {
      return Object.assign(state, _.cloneDeep(state), {
        ...action.payload
      });
    }

    case SurveyActionTypes.SURVEY_DESCRIPTION_CHANGED_ACTION: {
      return Object.assign(state, _.cloneDeep(state), {
        ...action.payload
      });
    }

    case SurveyActionTypes.SURVEY_SUMMARY_CHANGED_ACTION: {
      return Object.assign(state, _.cloneDeep(state), {
        ...action.payload
      });
    }

    case SurveyActionTypes.RESET_SURVEY_STATE_ACTION: {
      const { appState } = action.payload;
      return Object.assign(appState.survey);
    }

    default: {
      return state;
    }
  }
}
