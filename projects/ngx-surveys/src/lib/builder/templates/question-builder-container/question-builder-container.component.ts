import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {NgxSurveyState} from '../../../store/ngx-survey.state';
import {IElements} from '../../../models/elements.model';
import * as elements from '../../../store/elements/elements.actions';
import * as optionAnswersAction from '../../../store/option-answers/option-answers.actions';
import * as fromRoot from '../../../store/ngx-survey.reducer';
import {Subscription} from 'rxjs';
import {IBuilderOptions, IElementAndOptionAnswers} from '../../../models/index';
import {IBuilderElementButtonsOptionsBuilder, IBuilderImportElementOptionsBuilder} from '../../../models/builder-options.model';
import {ElementAndOptionAnswersModel} from '../../../models/element-and-option-answers.model';

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

  constructor(private store: Store<NgxSurveyState>) {
    this.builderOptionsSub = store.pipe(select(fromRoot.getBuilderOptions)).subscribe(res => {
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
      this.store.dispatch(new elements.ImportElementAction({ element, optionAnswers, pageId: this.pageId, currentElement }));
    });
  }

  handleCustomElementButton(element: IElements, cb): void {
    this.store.pipe(select(fromRoot.getOptionAnswersByElementId, { elementId: element.id })).subscribe(res => {
      const elementAndOptionAnswers: IElementAndOptionAnswers = new ElementAndOptionAnswersModel(element, res);
      cb({elementAndOptionAnswers});
    });
  }

  onQuestionTypeSelect(type: string, elementId: string) {
    this.questionType = type;

    if (this.prevQuestionType === 'checkboxes' || this.prevQuestionType === 'radio' || this.prevQuestionType === 'select') {
      this.store.dispatch(new optionAnswersAction.RemoveOptionAnswersMapAction({ elementId: this.element.id }));
    }

    this.store.dispatch(new elements.AddQuestionTypeAction({
      pageId: this.pageId,
      elementId,
      type,
    }));

    this.store.dispatch(new elements.ToggleIsActiveElementAction({ pageId: this.pageId, elementId, isSaved: false }));
    this.prevQuestionType = type;
  }

  saveQuestion(elementId: string) {
    this.store.dispatch(new elements.ToggleIsActiveElementAction({ pageId: this.pageId, elementId, isSaved: true }));
    this.isSavedEvent.emit({ key: this.element.id, isSaved: true });
  }

  editQuestion(elementId: string) {
    this.store.dispatch(new elements.ToggleIsActiveElementAction({ pageId: this.pageId, elementId, isSaved: false }));
    this.isSavedEvent.emit({ key: this.element.id, isSaved: false });
  }

  removeElement(elementId: string) {
    this.store.dispatch(new elements.RemoveElementAction({ pageId: this.pageId, elementId }));
  }

  moveElementDown(elementId: string) {
    this.store.dispatch(new elements.MoveElementDownAction({ pageId: this.pageId, elementId }));
  }

  moveElementUp(elementId: string) {
    this.store.dispatch(new elements.MoveElementUpAction({ pageId: this.pageId, elementId }));
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}


