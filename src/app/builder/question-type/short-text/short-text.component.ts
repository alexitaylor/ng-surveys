import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as elements from '../../../store/elements/elements.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'sb-short-text',
  templateUrl: './short-text.component.html',
  styleUrls: ['./short-text.component.scss']
})
export class ShortTextComponent implements OnInit, OnDestroy {
  @Input() data: any;
  isView: boolean;
  shortTextInputSub: Subscription;

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    this.isView = this.data.isView;
    if (this.isView) {
      setTimeout(() => {
        this.onShortTextChange();
      }, 300);
    }
  }

  ngOnDestroy() {
    if (this.isView) {
      this.shortTextInputSub.unsubscribe();
    }
  }

  onShortTextChange() {
    const $shortTextInput = document.getElementById(`short-text-input-${this.data.element.id}`);

    this.shortTextInputSub = fromEvent($shortTextInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(answer => {
      this.store.dispatch(new elements.UpdateQuestionAnswerAction({
        pageId: this.data.element.pageId,
        elementId: this.data.element.id,
        answer,
      }));
    });
  }

}
