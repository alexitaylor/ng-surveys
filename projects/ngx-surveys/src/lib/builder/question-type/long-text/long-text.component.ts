import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';
import {ElementsReducer} from '../../../store/elements/elements.reducer';

@Component({
  selector: 'ngxs-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss']
})
export class LongTextComponent implements OnInit, OnDestroy {
  @Input() data: any;
  isView: boolean;
  longTextInputSub: Subscription;

  constructor(
    private _elementsReducer: ElementsReducer,
  ) { }

  ngOnInit() {
    this.isView = this.data.isView;
    if (this.isView) {
      setTimeout(() => {
        this.onLongTextChange();
      }, 300);
    }
  }

  ngOnDestroy() {
    if (this.isView) {
      this.longTextInputSub.unsubscribe();
    }
  }

  onLongTextChange() {
    const $longTextInput = document.getElementById(`long-text-input-${this.data.element.id}`);

    this.longTextInputSub = fromEvent($longTextInput, 'input').pipe(
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
