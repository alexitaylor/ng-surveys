import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';

@Component({
  selector: 'ngs-short-text',
  templateUrl: './short-text.component.html',
  styleUrls: ['./short-text.component.scss']
})
export class ShortTextComponent implements OnInit, OnDestroy {
  @Input() data: any;
  isView: boolean;
  shortTextInputSub: Subscription;

  constructor(
    private _elementsReducer: ElementsReducer,
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
