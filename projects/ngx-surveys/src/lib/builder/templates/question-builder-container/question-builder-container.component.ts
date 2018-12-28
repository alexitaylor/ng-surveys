import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {IElements} from '../../../models/elements.model';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {IBuilderOptions, IElementAndOptionAnswers, IOptionAnswersMap} from '../../../models/index';
import {IBuilderElementButtonsOptionsBuilder, IBuilderImportElementOptionsBuilder} from '../../../models/builder-options.model';
import {ElementAndOptionAnswersModel} from '../../../models/element-and-option-answers.model';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';
import {NgxSurveyStore} from '../../../store/ngx-survey.store';
import {OptionAnswersReducer} from '../../../store/option-answers/option-answers.reducer';
import {OptionAnswersActionTypes} from '../../../store/option-answers/option-answers.actions';

@Component({
  selector: 'ngxs-question-builder-container',
  templateUrl: './question-builder-container.component.html',
  styleUrls: ['./question-builder-container.component.scss']
})
export class QuestionBuilderContainerComponent implements OnInit {
  @Input() surveyId: string;
  @Input() pageId: string;
  @Input() element: IElements;
  @Input() elementsSize: number;

  @Output() isSavedEvent = new EventEmitter<any>();

  questionType: string;
  prevQuestionType: string;

  builderOptionsSub: Subscription;
  builderOptions: IBuilderOptions;
  elementButtons: IBuilderElementButtonsOptionsBuilder[];
  importElementButton: IBuilderImportElementOptionsBuilder;

  constructor(
    private _ngxSurveyStore: NgxSurveyStore,
    private _elementsReducer: ElementsReducer,
    private _optionAnswersReducer: OptionAnswersReducer,
  ) {
    this.builderOptionsSub = this._ngxSurveyStore.builderOptions.subscribe(res => {
      this.builderOptions = res;
      this.elementButtons = this.builderOptions.elementButtons;
      this.importElementButton = this.builderOptions.importElement;
    });
  }

  ngOnInit() {
    if (this.element.type === 'question') {
      this.questionType = this.element.question.type;
      this.prevQuestionType = this.questionType;
    }
    setTimeout(() => {
      if (!!this.questionType) {
        this.isSavedEvent.emit({ key: this.element.id, isSaved: this.element.isSaved });
      }
    }, 100);
  }

  importElement(cb, currentElement) {
    cb().subscribe(({ element, optionAnswers }: IElementAndOptionAnswers) => {
      this._elementsReducer.elementsReducer({
        type: ElementsActionTypes.IMPORT_ELEMENT,
        payload: { element, optionAnswers, pageId: this.pageId, currentElement }
      });
    });
  }

  handleCustomElementButton(element: IElements, cb): void {
    this._ngxSurveyStore.optionAnswers.pipe(map(res => {
      const optionAnswers: IOptionAnswersMap = res.get(element.id);
      const elementAndOptionAnswers: IElementAndOptionAnswers = new ElementAndOptionAnswersModel(element, optionAnswers);
      cb({elementAndOptionAnswers});
    }));
  }

  onQuestionTypeSelect(type: string, elementId: string) {
    this.questionType = type;

    if (this.prevQuestionType === 'checkboxes' || this.prevQuestionType === 'radio' || this.prevQuestionType === 'select') {
      this._optionAnswersReducer.optionAnswersReducer({
        type: OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_MAP_ACTION,
        payload: { elementId: this.element.id },
      });
    }

    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.QUESTION_ADD_TYPE_ACTION,
      payload: {
        pageId: this.pageId,
        elementId,
        type,
      }
    });

    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.TOGGLE_IS_ACTIVE_ELEMENT_ACTION,
      payload: { pageId: this.pageId, elementId, isSaved: false }
    });
    this.prevQuestionType = type;
  }

  saveQuestion(elementId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.TOGGLE_IS_ACTIVE_ELEMENT_ACTION,
      payload: { pageId: this.pageId, elementId, isSaved: true }
    });
    this.isSavedEvent.emit({ key: this.element.id, isSaved: true });
  }

  editQuestion(elementId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.TOGGLE_IS_ACTIVE_ELEMENT_ACTION,
      payload: { pageId: this.pageId, elementId, isSaved: false }
    });
    this.isSavedEvent.emit({ key: this.element.id, isSaved: false });
  }

  cloneElement(elementId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.CLONE_ELEMENT_ACTION,
      payload: { pageId: this.pageId, elementId }
    });
  }

  removeElement(elementId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.REMOVE_ELEMENT_ACTION,
      payload: { pageId: this.pageId, elementId }
    });
  }

  moveElementDown(elementId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.MOVE_ELEMENT_DOWN_ACTION,
      payload: { pageId: this.pageId, elementId }
    });
  }

  moveElementUp(elementId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.MOVE_ELEMENT_UP_ACTION,
      payload: { pageId: this.pageId, elementId }
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}


