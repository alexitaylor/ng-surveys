import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import {
  SurveyAddQuestionTextAction, SurveyAddQuestionTypeAction, SurveyMoveElementDownAction, SurveyMoveElementUpAction,
  SurveyRemoveElementAction
} from '../../../store/survey/survey.actions';
import {IElements} from '../../../models/elements.model';
import {IPage} from '../../../models/page.model';
import * as fromRoot from '../../../store/app.reducer';
import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';

@Component({
  selector: 'sb-question-builder-container',
  templateUrl: './question-builder-container.component.html',
  styleUrls: ['./question-builder-container.component.scss']
})
export class QuestionBuilderContainerComponent implements OnInit, OnChanges {
  @Input() element: IElements;
  @Input() page: IPage;

  @Output() isSavedEvent = new EventEmitter<any>();

  elementsSize: number;
  questionType: string;
  isSaved = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.pipe(select(fromRoot.getElementsSize, { pageId: this.page.id })).subscribe(res => this.elementsSize = res);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.element.currentValue) {
      setTimeout(() => {
        this.handleQuestionNameChange();
      }, 300);
    }
  }

  onQuestionTypeSelect(type: string) {
    this.questionType = type;
    this.store.dispatch(new SurveyAddQuestionTypeAction({
      pageId: this.page.id,
      elementId: this.element.id,
      type,
    }));
  }

  handleQuestionNameChange() {
    const $questionText = document.getElementById(`questionText-${this.element.id}`);

    const questionText$ = fromEvent($questionText, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    );

    questionText$.subscribe(text => this.store.dispatch(new SurveyAddQuestionTextAction({
      pageId: this.page.id,
      elementId: this.element.id,
      text,
    })));
  }

  saveQuestion() {
    this.isSaved = true;
    this.isSavedEvent.emit({ key: this.element.id, isSaved: this.isSaved });
  }

  editQuestion() {
    this.isSaved = false;
    this.isSavedEvent.emit({ key: this.element.id, isSaved: this.isSaved });
  }

  removeElement() {
    this.store.dispatch(new SurveyRemoveElementAction({pageId: this.page.id, elementId: this.element.id}));
  }

  moveElementDown() {
    this.store.dispatch(new SurveyMoveElementDownAction({pageId: this.page.id, elementId: this.element.id}));
  }

  moveElementUp() {
    this.store.dispatch(new SurveyMoveElementUpAction({pageId: this.page.id, elementId: this.element.id}));
  }
}


