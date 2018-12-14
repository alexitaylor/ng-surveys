import { Injectable } from '@angular/core';
import * as fromRoot from '../store/ngx-survey.reducer';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {INgxSurvey} from '../models/ngx-survey.model';
import {IElementsMap, IElementsMaps, IOptionAnswersMap, IOptionAnswersMaps, IPageMap, NgxSurveyState} from '../models/index';

@Injectable({ providedIn: 'root' })
export class NgxSurveysService {

  constructor(
    private store: Store<NgxSurveyState>,
  ) { }

  /**
   * Listen to the latest state changes in the stream.
   * @return This method returns changes
   * that occur to the survey state.
   */
  getNgxSurveyState(): Observable<NgxSurveyState> {
    return this.store.pipe(select(fromRoot.getNgxSurveyState));
  }

  /**
   * Listen to the latest survey state changes in the stream.
   * @return This method returns changes
   * that occur to the survey state.
   */
  getSurveyChanges(): Observable<INgxSurvey> {
    return this.store.pipe(select(fromRoot.getSurvey));
  }

  /**
   * Listen to the latest pages state changes in the stream.
   * @return This method returns changes
   * that occur to the pages state.
   */
  getPagesChanges(): Observable<IPageMap> {
    return this.store.pipe(select(fromRoot.getPages));
  }

  /**
   * Listen to the latest element state changes in the stream.
   * @return This method returns changes
   * that occur to the elements state.
   */
  getElementsChanges(): Observable<IElementsMaps> {
    return this.store.pipe(select(fromRoot.getElements));
  }

  /**
   * Listen to the latest element state changes of a page in the stream.
   * @param pageId to retrieve elements of a specific page
   * @return This method returns changes
   * that occur to the elements state filtered by pageId.
   */
  getElementsByPageIdChanges(pageId: string): Observable<IElementsMap> {
    return this.store.pipe(select(fromRoot.getElementsByPageId, { pageId }));
  }

  /**
   * Listen to the latest option answers state changes in the stream.
   * @return This method returns changes
   * that occur to the option answers state.
   */
  getOptionAnswersChanges(): Observable<IOptionAnswersMaps> {
    return this.store.pipe(select(fromRoot.getOptionAnswers));
  }

  /**
   * Listen to the latest option answers state changes of an element in the stream.
   * @param elementId to retrieve option answers of a specific element
   * @return This method returns changes
   * that occur to the option answers state filtered by elementId.
   */
  getOptionAnswersByElementIdChanges(elementId: string): Observable<IOptionAnswersMap> {
    return this.store.pipe(select(fromRoot.getOptionAnswersByElementId, { elementId }));
  }
}
