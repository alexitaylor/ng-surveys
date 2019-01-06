import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import {IElements} from '../../../models/elements.model';
import {IOptionAnswers} from '../../../models/option-answers.model';
import {IPageMap} from '../../../models/page.model';
import {NgSurveyStore} from '../../../store/ng-survey.store';
import {OptionAnswersReducer} from '../../../store/option-answers/option-answers.reducer';
import {OptionAnswersActionTypes} from '../../../store/option-answers/option-answers.actions';

@Component({
  selector: 'ngs-option-template',
  templateUrl: './option-template.component.html',
  styleUrls: ['./option-template.component.scss']
})
export class OptionTemplateComponent implements OnInit, OnDestroy {
  @Input() optionAnswersSize: number;
  @Input() optionAnswer: IOptionAnswers;
  @Input() element: IElements;
  @Input() isPageNavChecked: boolean;
  @Input() surveyId: string;
  @Input() isNewOption: boolean;

  pagesSub: Subscription;
  pages: IPageMap;
  isOptionActive = true;

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private _optionAnswersReducer: OptionAnswersReducer,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.pagesSub = this._ngSurveyStore.pages.subscribe(res => this.pages = res);

      if (this.isNewOption) {
        const $optionTemplateInput = document.getElementById(`optionTemplateInput-${this.optionAnswer.id}`);
        $optionTemplateInput.focus();
        this.isNewOption = false;
      }
      this.onOptionsValueChange();
    }, 300);
  }

  ngOnDestroy() {
    if (this.pagesSub) {
      this.pagesSub.unsubscribe();
    }
  }

  onFocus(e) {
    if (e.returnValue && this.optionAnswer.orderNo === this.optionAnswersSize) {
      this.isOptionActive = e.returnValue;
    }
  }

  removeOptionAnswer() {
    this._optionAnswersReducer.optionAnswersReducer({
      type: OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_ACTION,
      payload: {
        elementId: this.element.id,
        optionAnswerId: this.optionAnswer.id
      }
    });
  }

  onOptionsValueChange() {
    const $optionTemplateInput = document.getElementById(`optionTemplateInput-${this.optionAnswer.id}`);

    const optionTemplateInput$ = fromEvent($optionTemplateInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    );

    optionTemplateInput$.subscribe(value => {
      this._optionAnswersReducer.optionAnswersReducer({
        type: OptionAnswersActionTypes.ADD_OPTION_ANSWERS_VALUE_ACTION,
        payload: {
          elementId: this.element.id,
          optionAnswerId: this.optionAnswer.id,
          value
        }
      });
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
