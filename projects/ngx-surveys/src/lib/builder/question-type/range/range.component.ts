import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {IElements} from '../../../models';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';

@Component({
  selector: 'ngxs-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit, OnDestroy {
  @Input() data: any;
  isView: boolean;
  currentRange: number;

  element: IElements;
  pageId: string;

  minSub: Subscription;
  maxSub: Subscription;

  rangeInputSub: Subscription;

  constructor(
    private _elementsReducer: ElementsReducer,
  ) { }

  ngOnInit() {
    this.element = this.data.element;
    this.pageId = this.data.element.pageId;
    this.isView = this.data.isView;

    if (!this.isView) {
      setTimeout(() => {
        this.onMinChange();
        this.onMaxChange();
      }, 300);
    } else {
      setTimeout(() => {
        this.onRangeChange();
      }, 300);
    }
  }

  ngOnDestroy() {
    if (this.isView) {
      this.rangeInputSub.unsubscribe();
    }
  }

  onMinChange() {
    const $min = document.getElementById(`min-range-${this.element.id}`);

    this.minSub = fromEvent($min, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000),
    ).subscribe(min => this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.QUESTION_UPDATE_MIN_ACTION,
      payload: {
        pageId: this.pageId,
        elementId: this.element.id,
        min
      }}));
  }

  onMaxChange() {
    const $max = document.getElementById(`max-range-${this.element.id}`);

    this.maxSub = fromEvent($max, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(max => this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.QUESTION_UPDATE_MAX_ACTION,
      payload: {
        pageId: this.pageId,
        elementId: this.element.id,
        max
      }}));
  }

  onRangeChange() {
    const $rangeInput = document.getElementById(`range-input-${this.element.id}`);

    this.rangeInputSub = fromEvent($rangeInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(answer => {
      this._elementsReducer.elementsReducer({
        type: ElementsActionTypes.QUESTION_UPDATE_ANSWER_ACTION,
        payload: {
          pageId: this.element.pageId,
          elementId: this.element.id,
          answer,
          pageFlowModifier: this.data.element.question.pageFlowModifier,
          pageFlow: this.data.element.pageFlow,
        }});
    });
  }

}
