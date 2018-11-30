import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import {AppState} from '../../../store/app.state';
import {
  SurveyAddOptionAnswersAction, SurveyAddOptionAnswerValueAction,
  SurveyRemoveOptionAnswersAction, SurveyUpdateOptionAnswerPageFlow, SurveyUpdateQuestionPageFlowModifierAction
} from '../../../store/survey/survey.actions';
import {IElements} from '../../../models/elements.model';
import {IOptionAnswers, IOptionAnswersMap} from '../../../models/option-answers.model';
import {IPageMap} from '../../../models/page.model';
import * as fromRoot from '../../../store/app.reducer';
import {PageFlow} from '../../../models/page-flow.model';

@Component({
  selector: 'sb-option-template',
  templateUrl: './option-template.component.html',
  styleUrls: ['./option-template.component.scss']
})
export class OptionTemplateComponent implements OnInit {
  @Input() optionAnswersSize: number;
  @Input() optionAnswer: IOptionAnswers;
  @Input() element: IElements;
  @Input() isPageNavChecked: boolean;

  @Output() isOptionActiveEvent = new EventEmitter<boolean>();

  pages$: Observable<IPageMap>;
  isOptionActive = false;
  pageNavNext = 'goToNextPage';

  constructor(
    private store: Store<AppState>,
  ) {
    this.pages$ = store.pipe(select(fromRoot.getSurveyPages));
  }

  ngOnInit() {
    setTimeout(() => {
      this.onOptionsValueChange();
      this.onSaveQuestionClick();
    }, 300);
  }

  onFocus(e) {
    if (e.returnValue && this.optionAnswer.orderNo === this.optionAnswersSize) {
      this.isOptionActive = e.returnValue;
      this.isOptionActiveEvent.emit(this.isOptionActive);
      this.store.dispatch(new SurveyAddOptionAnswersAction({ pageId: this.element.pageId, elementId: this.element.id }));
    }
  }

  handlePageNavNext(value) {
    const pageFlow = new PageFlow();
    if (value === 'goToNextPage') {
      pageFlow.nextPage = true;
      pageFlow.label = 'pageFlow.goToNextPage';
    } else {
      pageFlow.nextPage = false;
      pageFlow.label = 'pageFlow.goToPage';
      pageFlow.pageId = value;
    }

    this.store.dispatch(new SurveyUpdateOptionAnswerPageFlow({
      pageId: this.element.pageId,
      elementId: this.element.id,
      optionAnswerId: this.optionAnswer.id,
      pageFlow
    }));
  }

  removeOptionAnswer() {
    this.store.dispatch(new SurveyRemoveOptionAnswersAction(
      {
        pageId: this.element.pageId,
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
      this.store.dispatch(new SurveyAddOptionAnswerValueAction({
        pageId: this.element.pageId,
        elementId: this.element.id,
        optionAnswerId: this.optionAnswer.id,
        value
      }));
    });
  }

  onSaveQuestionClick() {
    const $saveQuestionButton = document.getElementById(`save-question-button-${this.element.id}`);

    fromEvent($saveQuestionButton, 'click').pipe(
      map(event => event)
    ).subscribe(res => {
      if (res) {
        this.isOptionActive = false;
        this.isOptionActiveEvent.emit(this.isOptionActive);
        this.onEditQuestionClick();
      }
    });
  }

  onEditQuestionClick() {
    const $editQuestionButton = document.getElementById(`edit-question-button-${this.element.id}`);

    fromEvent($editQuestionButton, 'click').pipe(
      map(event => event)
    ).subscribe(res => {
      if (res) {
        this.isOptionActive = true;
        this.isOptionActiveEvent.emit(this.isOptionActive);
        this.onSaveQuestionClick();
      }
    });
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
