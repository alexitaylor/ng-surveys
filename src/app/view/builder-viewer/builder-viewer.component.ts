import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';

import {AppState} from '../../store/app.state';
import {SurveyAddPageAction, SurveyDescriptionChangedAction, SurveyNameChangedAction} from '../../store/survey/survey.actions';
import {IPageMap} from '../../models/page.model';

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
    this.surveyName$ = store.pipe(select(state => state.survey.name));
    this.surveyDescription$ = store.pipe(select(state => state.survey.description));
    this.pages$ = store.pipe(select(state => state.survey.pages));
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

    surveyName$.subscribe(value => {
      this.store.dispatch(new SurveyNameChangedAction(value));
    });
  }

  handleSurveyDescriptionChange() {
    const $surveyDescription = document.getElementById('surveyDescription');

    const surveyName$ = fromEvent($surveyDescription, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    );

    surveyName$.subscribe(value => {
      this.store.dispatch(new SurveyDescriptionChangedAction(value));
    });
  }

  addPage() {
    this.store.dispatch(new SurveyAddPageAction());
  }

}
