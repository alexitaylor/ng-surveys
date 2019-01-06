import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  INgSurvey,
  IElementsMap,
  IElementsMaps,
  IOptionAnswersMap,
  IOptionAnswersMaps,
  IPageMap,
  NgSurveyState
} from '../models';
import {NgSurveyStore} from '../store/ng-survey.store';

@Injectable({ providedIn: 'root' })
export class NgSurveysService {

  constructor(
    private _ngSurveyStore: NgSurveyStore,
  ) { }

  /**
   * Listen to the latest state changes in the stream.
   * @return This method returns changes
   * that occur to all of the survey state.
   */
  getNgSurveyState(): Observable<NgSurveyState> {
    return this._ngSurveyStore.ngSurveyState;
  }

  /**
   * Listen to the latest survey state changes in the stream.
   * @return This method returns changes
   * that occur to the survey state.
   */
  getSurveyChanges(): Observable<INgSurvey> {
    return this._ngSurveyStore.survey;
  }

  /**
   * Listen to the latest pages state changes in the stream.
   * @return This method returns changes
   * that occur to the pages state.
   */
  getPagesChanges(): Observable<IPageMap> {
    return this._ngSurveyStore.pages;
  }

  /**
   * Listen to the latest element state changes in the stream.
   * @return This method returns changes
   * that occur to the elements state.
   */
  getElementsChanges(): Observable<IElementsMaps> {
    return this._ngSurveyStore.elements;
  }

  /**
   * Listen to the latest element state changes of a page in the stream.
   * @param pageId to retrieve elements of a specific page
   * @return This method returns changes
   * that occur to the elements state filtered by pageId.
   */
  getElementsByPageIdChanges(pageId: string): Observable<IElementsMap> {
    return this._ngSurveyStore.elements.pipe(map(res => {
      return res.get(pageId);
    }));
  }

  /**
   * Listen to the latest option answers state changes in the stream.
   * @return This method returns changes
   * that occur to the option answers state.
   */
  getOptionAnswersChanges(): Observable<IOptionAnswersMaps> {
    return this._ngSurveyStore.optionAnswers;
  }

  /**
   * Listen to the latest option answers state changes of an element in the stream.
   * @param elementId to retrieve option answers of a specific element
   * @return This method returns changes
   * that occur to the option answers state filtered by elementId.
   */
  getOptionAnswersByElementIdChanges(elementId: string): Observable<IOptionAnswersMap> {
    return this._ngSurveyStore.optionAnswers.pipe(map(res => {
      return res.get(elementId);
    }));
  }
}
