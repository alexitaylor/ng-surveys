import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import {AppState} from '../../../store/app.state';
import {IElements} from '../../../models/elements.model';
import {IOptionAnswers} from '../../../models/option-answers.model';
import {IPageMap} from '../../../models/page.model';
import * as fromRoot from '../../../store/app.reducer';
import * as optionAnswers from '../../../store/option-answers/option-answers.actions';

@Component({
  selector: 'sb-option-template',
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
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.pagesSub = this.store.pipe(select(fromRoot.getPagesBySurveyId, { surveyId: this.surveyId })).subscribe(res => this.pages = res);

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
    this.store.dispatch(new optionAnswers.RemoveOptionAnswersAction(
      {
        elementId: this.element.id,
        optionAnswerId: this.optionAnswer.id
      }));
  }

  onOptionsValueChange() {
    const $optionTemplateInput = document.getElementById(`optionTemplateInput-${this.optionAnswer.id}`);

    const optionTemplateInput$ = fromEvent($optionTemplateInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    );

    optionTemplateInput$.subscribe(value => {
      this.store.dispatch(new optionAnswers.AddOptionAnswerValueAction({
        elementId: this.element.id,
        optionAnswerId: this.optionAnswer.id,
        value
      }));
    });
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
