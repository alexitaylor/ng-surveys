import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {UUID} from 'angular2-uuid';

import {AppState} from '../../store/app.state';
import * as survey from '../../store/survey/survey.actions';
import * as fromRoot from '../../store/app.reducer';
import * as pages from '../../store/pages/pages.actions';
import {resetAppState} from '../../store/utils';
import {IPageMap} from '../../models/page.model';
import {IAngularSurvey} from '../../models/angular-survey.model';

@Component({
  selector: 'sb-builder-viewer',
  templateUrl: './builder-viewer.component.html',
  styleUrls: ['./builder-viewer.component.scss']
})
export class BuilderViewerComponent implements OnInit, OnDestroy {
  surveySub: Subscription;
  survey: IAngularSurvey;

  surveyNameSub$: Subscription;
  surveyDescriptionSub$: Subscription;

  pagesSub: Subscription;
  pages: IPageMap;
  isLoading = false;

  constructor(
    private store: Store<AppState>
  ) {
    this.surveySub = store.pipe(select(fromRoot.getSurvey)).subscribe(res => {
      this.survey = res;
      this.pagesSub = store.pipe(select(fromRoot.getPagesBySurveyId, { surveyId: this.survey.id })).subscribe(pages => {
        this.pages = pages;
      });
    });
  }

  ngOnInit() {
    setTimeout(() => {
      if (!this.survey.isLoading) {
        this.handleSurveyNameChange();
        this.handleSurveyDescriptionChange();
      }
    }, 300);
  }

  ngOnDestroy() {
    this.surveySub.unsubscribe();
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

    this.surveyDescriptionSub$ = fromEvent($surveyDescription, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(description => {
      this.store.dispatch(new survey.SurveyDescriptionChangedAction({ description }));
    });
  }

  addPage() {
    const pageId = UUID.UUID();
    this.store.dispatch(new pages.AddPageAction({ surveyId: this.survey.id, pageId }));
  }

  reset() {
    // location.reload();
    //this.survey.isLoading = true;
    const appState: AppState = resetAppState();
    appState.survey.isLoading = true;
    this.store.dispatch(new survey.ResetSurveyStateAction({ appState }));
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
