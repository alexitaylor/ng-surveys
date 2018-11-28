import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {surveyReducer} from './survey/survey.reducer';


export const reducers: ActionReducerMap<AppState> = {
  survey: surveyReducer,
};
