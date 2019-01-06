import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {ElementsReducer} from '../../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../../store/elements/elements.actions';

@Component({
  selector: 'ngs-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit {
  @Input() elementValue: string;
  @Input() elementId: string;
  @Input() pageId: string;
  @Input() isElementSaved: boolean;

  constructor(
    private _elementsReducer: ElementsReducer,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.handleQuestionNameChange();
    }, 300);
  }

  handleQuestionNameChange() {
    const $questionText = document.getElementById(`questionText-${this.elementId}`);

    fromEvent($questionText, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000),
      map(text => text)
    ).subscribe(text => this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.QUESTION_ADD_TEXT_ACTION,
      payload: {
        pageId: this.pageId,
        elementId: this.elementId,
        text,
      }
    }));
  }

}
