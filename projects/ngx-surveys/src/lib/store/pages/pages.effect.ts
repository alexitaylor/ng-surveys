// import {Injectable} from '@angular/core';
// import {Observable, of} from 'rxjs';
// import { Action } from '@ngrx/store';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import {catchError, switchMap} from 'rxjs/internal/operators';
//
// import * as pages from './pages.actions';
// import * as elements from '../elements/elements.actions';
// import {CustomAction} from '../../models/custom-action.model';
//
// @Injectable()
// export class PagesEffect {
//   @Effect()
//   addPage: Observable<Action> = this.action$.pipe(
//     ofType(pages.PagesActionTypes.ADD_PAGE_ACTION),
//     switchMap(({ payload }: CustomAction) => [new elements.AddElementAction({ pageId: payload.pageId, type: 'question' })]),
//     catchError(() => of({ type: 'ADD_PAGE_ERROR' }))
//   );
//
//   @Effect()
//   insertPage: Observable<Action> = this.action$.pipe(
//     ofType(pages.PagesActionTypes.INSERT_PAGE_ACTION),
//     switchMap(({ payload }: CustomAction) => [new elements.AddElementAction({ pageId: payload.pageId, type: 'question' })]),
//     catchError(() => of({ type: 'INSERT_PAGE_ERROR' }))
//   );
//
//   @Effect()
//   removePage: Observable<Action> = this.action$.pipe(
//     ofType(pages.PagesActionTypes.REMOVE_PAGE_ACTION),
//     switchMap(({ payload }: CustomAction) =>
//       [new elements.RemoveElementsMapAction({ pageId: payload.pageId, elementIds: payload.elementIds })]
//     ),
//     catchError(() => of({ type: 'REMOVE_PAGE_ERROR' }))
//   );
//
//   constructor(private action$: Actions) {}
// }
