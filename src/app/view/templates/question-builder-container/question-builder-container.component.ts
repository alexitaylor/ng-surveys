import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IQuestionItem} from '../../../builder/question-builder/question-item.component';
import {AppState} from '../../../store/app.state';
import {Store} from '@ngrx/store';
import {SurveyAddQuestionTextAction, SurveyAddQuestionTypeAction, SurveyRemoveElementAction} from '../../../store/survey/survey.actions';
import {IElements} from '../../../models/elements.model';
import {IPage} from '../../../models/page.model';
import {fromEvent} from 'rxjs';
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

  questionType: string;
  isSaved = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
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
    // TODO add another question template to parent
  }

  removeElement() {
    this.store.dispatch(new SurveyRemoveElementAction({pageId: this.page.id, elementId: this.element.id}));
  }
}


