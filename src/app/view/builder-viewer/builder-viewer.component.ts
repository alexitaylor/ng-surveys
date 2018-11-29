import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';

import {AppState} from '../../store/app.state';
import {SurveyAddPageAction, SurveyDescriptionChangedAction, SurveyNameChangedAction} from '../../store/survey/survey.actions';
import {IPageMap} from '../../models/page.model';
import * as fromRoot from '../../store/app.reducer';

@Component({
  selector: 'sb-builder-viewer',
  templateUrl: './builder-viewer.component.html',
  styleUrls: ['./builder-viewer.component.scss']
})
export class BuilderViewerComponent implements OnInit {
  surveyName$: Observable<string>;
  surveyDescription$: Observable<string>;
  pages$: Observable<IPageMap>;

  constructor(
    private store: Store<AppState>
  ) {
    this.surveyName$ = store.pipe(select(fromRoot.getSurveyName));
    this.surveyDescription$ = store.pipe(select(fromRoot.getSurveyDescription));
    this.pages$ = store.pipe(select(fromRoot.getSurveyPages));
  }

  ngOnInit() {
    this.handleSurveyNameChange();
    this.handleSurveyDescriptionChange();
  }

  handleSurveyNameChange() {
    const $surveyName = document.getElementById('surveyName');

    const surveyName$ = fromEvent($surveyName, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    );

    surveyName$.subscribe(name => {
      this.store.dispatch(new SurveyNameChangedAction({ name }));
    });
  }

  handleSurveyDescriptionChange() {
    const $surveyDescription = document.getElementById('surveyDescription');

    const surveyName$ = fromEvent($surveyDescription, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    );

    surveyName$.subscribe(description => {
      this.store.dispatch(new SurveyDescriptionChangedAction({ description }));
    });
  }

  addPage() {
    this.store.dispatch(new SurveyAddPageAction());
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }

}
