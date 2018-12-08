import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import {IElements} from '../../../models/elements.model';
import * as elements from '../../../store/elements/elements.actions';

@Component({
  selector: 'sb-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit, OnDestroy {
  @Input() data: any;

  element: IElements;
  pageId: string;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.element = this.data.element;
    this.pageId = this.data.element.pageId;

    setTimeout(() => {
      this.onMinChange();
      this.onMaxChange();
    }, 300);
  }

  ngOnDestroy() {
    this.store.dispatch(new elements.RemoveQuestionMinAndMaxAction({
      pageId: this.pageId,
      elementId: this.element.id,
    }));
  }

  onMinChange() {
    const $min = document.getElementById(`min-range-${this.element.id}`);

    const min$ = fromEvent($min, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    );

    min$.subscribe(min => {
      this.store.dispatch(new elements.UpdateQuestionMinAction({
        pageId: this.pageId,
        elementId: this.element.id,
        min
      }));
    });
  }

  onMaxChange() {
    const $max = document.getElementById(`max-range-${this.element.id}`);

    const max$ = fromEvent($max, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    );

    max$.subscribe(max => {
      this.store.dispatch(new elements.UpdateQuestionMaxAction({
        pageId: this.pageId,
        elementId: this.element.id,
        max
      }));
    });
  }

}
