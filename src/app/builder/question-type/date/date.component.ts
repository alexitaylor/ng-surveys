import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as elements from '../../../store/elements/elements.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';

@Component({
  selector: 'sb-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, OnDestroy {
  @Input() data: any;
  isView: boolean;
  dateTextInputSub: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.isView = this.data.isView;

    if (this.isView) {
      setTimeout(() => {
        this.onDateChange();
      }, 300);
    }
  }

  ngOnDestroy() {
    if (this.isView) {
      this.dateTextInputSub.unsubscribe();
    }
  }

  onDateChange() {
    const $dateInput = document.getElementById(`date-input-${this.data.element.id}`);

    this.dateTextInputSub = fromEvent($dateInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(answer => {
      this.store.dispatch(new elements.UpdateQuestionAnswerAction({
        pageId: this.data.element.pageId,
        elementId: this.data.element.id,
        answer,
        pageFlowModifier: this.data.element.question.pageFlowModifier,
        pageFlow: this.data.element.pageFlow,
        surveyId: this.data.surveyId,
      }));
    });
  }
}
