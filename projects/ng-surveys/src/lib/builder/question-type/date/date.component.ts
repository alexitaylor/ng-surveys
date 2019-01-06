import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';

@Component({
  selector: 'ngs-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, OnDestroy {
  @Input() data: any;
  isView: boolean;
  dateTextInputSub: Subscription;

  constructor(
    private _elementsReducer: ElementsReducer,
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
      this._elementsReducer.elementsReducer({
        type: ElementsActionTypes.QUESTION_UPDATE_ANSWER_ACTION,
        payload: {
          pageId: this.data.element.pageId,
          elementId: this.data.element.id,
          answer,
          pageFlowModifier: this.data.element.question.pageFlowModifier,
          pageFlow: this.data.element.pageFlow,
        }
      });
    });
  }
}
