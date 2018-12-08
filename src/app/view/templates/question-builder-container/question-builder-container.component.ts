import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from '../../../store/app.state';
import {IElements} from '../../../models/elements.model';
import * as elements from '../../../store/elements/elements.actions';

@Component({
  selector: 'sb-question-builder-container',
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
  isSaved = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onQuestionTypeSelect(type: string, elementId: string) {
    this.questionType = type;
    this.store.dispatch(new elements.AddQuestionTypeAction({
      pageId: this.pageId,
      elementId,
      type,
    }));
  }

  saveQuestion(key: string) {
    this.isSaved = true;
    this.isSavedEvent.emit({ key: this.element.id, isSaved: this.isSaved })
  }

  editQuestion(key: string) {
    this.isSaved = false;
    this.isSavedEvent.emit({ key: this.element.id, isSaved: this.isSaved })
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

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}


