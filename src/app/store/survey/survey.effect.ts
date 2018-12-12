import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {catchError, switchMap, map, delay} from 'rxjs/internal/operators';

import * as survey from './survey.actions';
import * as pages from '../pages/pages.actions';
import * as elements from '../elements/elements.actions';
import * as optionAnswers from '../option-answers/option-answers.actions';
import {CustomAction} from '../../models/custom-action.model';

@Injectable()
export class SurveyEffect {
  @Effect()
  resetSurveyState: Observable<Action> = this.action$.pipe(
    map(action => action),
    ofType(survey.SurveyActionTypes.RESET_SURVEY_STATE_ACTION),
    delay(1000),
    switchMap(({ payload }: CustomAction) => [
      new pages.ResetPageStateAction({ appState: payload.appState }),
      new elements.ResetElementsStateAction({ appState: payload.appState }),
      new optionAnswers.ResetOptionAnswersStateAction({ appState: payload.appState }),
      new survey.HandleSurveyLoading({ isLoading: false }),
    ]),
    catchError(() => of({ type: 'RESET_SURVEY_STATE_ERROR' }))
  );

  constructor(private action$: Actions) {}
}
