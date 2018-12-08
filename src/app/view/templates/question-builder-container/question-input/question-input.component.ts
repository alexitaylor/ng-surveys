import {Component, Input, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.state';
import * as elements from '../../../../store/elements/elements.actions';

@Component({
  selector: 'sb-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit {
  @Input() elementValue: string;
  @Input() elementId: string;
  @Input() pageId: string;

  constructor(private store: Store<AppState>) { }

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
    ).subscribe(text => this.store.dispatch(new elements.AddQuestionTextAction({
      pageId: this.pageId,
      elementId: this.elementId,
      text,
    })));
  }

}
