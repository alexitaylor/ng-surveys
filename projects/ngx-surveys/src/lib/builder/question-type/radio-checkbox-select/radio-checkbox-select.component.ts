import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IOptionAnswersMap} from '../../../models/option-answers.model';
import {IElements} from '../../../models/elements.model';
import {fromEvent, Subscription} from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {map} from 'rxjs/operators';
import {NgxSurveyStore} from '../../../store/ngx-survey.store';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';
import {OptionAnswersReducer} from '../../../store/option-answers/option-answers.reducer';
import {OptionAnswersActionTypes} from '../../../store/option-answers/option-answers.actions';

@Component({
  selector: 'ngxs-radio-checkbox-select',
  templateUrl: './radio-checkbox-select.component.html',
  styleUrls: ['./radio-checkbox-select.component.scss']
})
export class RadioCheckboxSelectComponent implements OnInit, OnDestroy {
  @Input() data: any;

  element: IElements;
  optionAnswersSub: Subscription;
  optionAnswers: IOptionAnswersMap;
  optionAnswersSize: number;
  elementSub: Subscription;
  pageId: string;
  surveyId: string;
  isPageNavChecked = false;
  isSaved = false;
  isNewOption = false;

  constructor(
    private _ngxSurveyStore: NgxSurveyStore,
    private _elementsReducer: ElementsReducer,
    private _optionAnswersReducer: OptionAnswersReducer,
  ) {}

  ngOnInit() {
    this.pageId = this.data.element.pageId;
    this.surveyId = this.data.surveyId;

    this.elementSub = this._ngxSurveyStore.elements.subscribe(res => {
      this.element = res.get(this.pageId).get(this.data.element.id);
    });

    this.optionAnswersSub = this._ngxSurveyStore.optionAnswers.subscribe(res => {
      this.optionAnswers = res.get(this.data.element.id);
      this.optionAnswersSize = this.optionAnswers.size;
    });

    setTimeout(() => {
      this.onSaveQuestionClick();
    }, 300);
  }

  ngOnDestroy() {
    this.elementSub.unsubscribe();
    this.optionAnswersSub.unsubscribe();
  }

  togglePageNavChecked(e) {
    this.isPageNavChecked = e.target.checked;
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.QUESTION_UPDATE_PAGE_FLOW_MODIFIER_ACTION,
      payload: {
        pageId: this.pageId,
        elementId: this.element.id,
        pageFlowModifier: this.isPageNavChecked
      }
    });
  }

  addOptionInput() {
    if (!this.element.isSaved) {
      this._optionAnswersReducer.optionAnswersReducer({
        type: OptionAnswersActionTypes.ADD_OPTION_ANSWERS_ACTION,
        payload: {
          elementId: this.element.id
        }
      });
      this.isNewOption = true;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    this._optionAnswersReducer.optionAnswersReducer({
      type: OptionAnswersActionTypes.DRAG_OPTION_ANSWERS_ACTION,
      payload: {
        elementId: this.element.id,
        startIndex: event.previousIndex,
        endIndex: event.currentIndex,
      }
    });
  }

  onSaveQuestionClick() {
    const $saveQuestionButton = document.getElementById(`save-question-button-${this.element.id}`);

    if ($saveQuestionButton) {
      fromEvent($saveQuestionButton, 'click').pipe(
        map(event => event)
      ).subscribe(res => {
        if (res) {
          this.isSaved = true;
          this.onEditQuestionClick();
        }
      });
    }
  }

  onEditQuestionClick() {
    const $editQuestionButton = document.getElementById(`edit-question-button-${this.element.id}`);

    fromEvent($editQuestionButton, 'click').pipe(
      map(event => event)
    ).subscribe(res => {
      if (res) {
        this.isSaved = false;
        this.onSaveQuestionClick();
      }
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
