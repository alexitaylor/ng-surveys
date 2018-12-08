import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/internal/operators';

import * as elements from './elements.actions';
import * as optionAnswers from '../option-answers/option-answers.actions';
import {CustomAction} from '../../models/custom-action.model';

@Injectable()
export class ElementsEffect {
  @Effect()
  addQuestionType: Observable<Action> = this.actions$.pipe(
    ofType(elements.ElementsActionTypes.QUESTION_ADD_TYPE_ACTION),
    switchMap(({ payload }: CustomAction) => {
      const { type, elementId } = payload;

      if (type === 'radio' || type === 'checkboxes' || type === 'select') {
        return [new optionAnswers.AddOptionAnswersAction({ elementId })];
      }
      return of({ type: 'NO_ACTION' });
    }),
    catchError(() => of({ type: 'ADD_QUESTION_TYPE_ERROR' }))
  );

  @Effect()
  removeElement: Observable<Action> = this.actions$.pipe(
    ofType(elements.ElementsActionTypes.REMOVE_ELEMENT_ACTION),
    switchMap(({ payload }: CustomAction) => [new optionAnswers.RemoveOptionAnswersMapAction({ elementId: payload.elementId })]),
    catchError(() => of({ type: 'REMOVE_ELEMENTS_ERROR' }))
  );

  @Effect()
  removeElementMap: Observable<Action> = this.actions$.pipe(
    ofType(elements.ElementsActionTypes.REMOVE_ELEMENT_MAP_ACTION),
    switchMap(({ payload }: CustomAction) => [new optionAnswers.RemoveOptionAnswersMapsAction({ elementIds: payload.elementIds })]),
    catchError(() => of({ type: 'REMOVE_ELEMENTS_MAP_ERROR' }))
  );

  constructor(private actions$: Actions) {}
}
