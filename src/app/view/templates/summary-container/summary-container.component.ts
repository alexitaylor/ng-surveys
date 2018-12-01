import { Component, OnInit } from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {Store} from '@ngrx/store';
import {SurveySummaryChangedAction} from '../../../store/survey/survey.actions';

@Component({
  selector: 'sb-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss']
})
export class SummaryContainerComponent implements OnInit {

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    this.onSummaryChange();
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
