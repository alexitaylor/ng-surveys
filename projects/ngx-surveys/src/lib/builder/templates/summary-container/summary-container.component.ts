import {Component, OnDestroy, OnInit} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {Store, select} from '@ngrx/store';

import {SurveySummaryChangedAction} from '../../../store/survey/survey.actions';
import {NgxSurveyState} from '../../../store/ngx-survey.state';
import {INgxSurvey} from '../../../models/ngx-survey.model';
import * as fromRoot from '../../../store/ngx-survey.reducer';

@Component({
  selector: 'ngxs-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss']
})
export class SummaryContainerComponent implements OnInit, OnDestroy {
  surveySub: Subscription;
  survey: INgxSurvey;

  constructor(
    private store: Store<NgxSurveyState>,
  ) {
    this.surveySub = store.pipe(select(fromRoot.getSurvey)).subscribe(res => {
      this.survey = res;
    });
  }

  ngOnInit() {
    this.onSummaryChange();
  }

  ngOnDestroy() {
    this.surveySub.unsubscribe();
  }

  onSummaryChange() {
    const $summaryInput = document.getElementById('summaryInput');

    fromEvent($summaryInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(summary => {
      this.store.dispatch(new SurveySummaryChangedAction({ summary }));
    });
  }

}
