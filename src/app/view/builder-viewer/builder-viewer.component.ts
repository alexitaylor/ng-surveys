import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';

import {AppState} from '../../store/app.state';
import * as survey from '../../store/survey/survey.actions';
import * as fromRoot from '../../store/app.reducer';
import * as pages from '../../store/pages/pages.actions';
import {UUID} from 'angular2-uuid';
import {IPageMap} from '../../models/page.model';

@Component({
  selector: 'sb-builder-viewer',
  templateUrl: './builder-viewer.component.html',
  styleUrls: ['./builder-viewer.component.scss']
})
export class BuilderViewerComponent implements OnInit, OnDestroy {
  surveyName$: Observable<string>;
  surveyDescription$: Observable<string>;
  surveyIdSub: Subscription;
  surveyId: string;
  surveyNameSub$: Subscription;

  pagesSub: Subscription;
  pages: IPageMap;

  constructor(
    private store: Store<AppState>
  ) {
    this.surveyName$ = store.pipe(select(fromRoot.getSurveyName));
    this.surveyDescription$ = store.pipe(select(fromRoot.getSurveyDescription));
    this.surveyIdSub = store.pipe(select(fromRoot.getSurveyId)).subscribe(res => {
      this.surveyId = res;
    });
    this.pagesSub = store.pipe(select(fromRoot.getPagesBySurveyId, { surveyId: this.surveyId })).subscribe(res => {
      this.pages = res;
    });
  }

  ngOnInit() {
    this.handleSurveyNameChange();
    this.handleSurveyDescriptionChange();
  }

  ngOnDestroy() {
    this.surveyNameSub$.unsubscribe();
    this.surveyNameSub$.unsubscribe();
    this.pagesSub.unsubscribe();
  }

  handleSurveyNameChange() {
    const $surveyName = document.getElementById('surveyName');

    this.surveyNameSub$ = fromEvent($surveyName, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(name => {
      this.store.dispatch(new survey.SurveyNameChangedAction({ name }));
    });
  }

  handleSurveyDescriptionChange() {
    const $surveyDescription = document.getElementById('surveyDescription');

    this.surveyNameSub$ = fromEvent($surveyDescription, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(description => {
      this.store.dispatch(new survey.SurveyDescriptionChangedAction({ description }));
    });
  }

  addPage() {
    const pageId = UUID.UUID();
    this.store.dispatch(new pages.AddPageAction({ surveyId: this.surveyId, pageId }));
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
