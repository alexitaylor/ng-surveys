import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IOptionAnswersMap} from '../../../models/option-answers.model';
import {NgSurveyStore} from '../../../store/ng-survey.store';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';

@Component({
  selector: 'ngs-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit, OnDestroy {
  @Input() data: any;
  optionAnswers: IOptionAnswersMap;
  optionAnswersSub: Subscription;

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private _elementsReducer: ElementsReducer,
  ) { }

  ngOnInit() {
    this.optionAnswersSub = this._ngSurveyStore.optionAnswers.subscribe(res => {
      this.optionAnswers = res.get(this.data.element.id);
    });
  }

  ngOnDestroy() {
    this.optionAnswersSub.unsubscribe();
  }

  handleChange(answer, pageFlow) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.QUESTION_UPDATE_ANSWER_ACTION,
      payload: {
        pageId: this.data.element.pageId,
        elementId: this.data.element.id,
        answer,
        pageFlowModifier: this.data.element.question.pageFlowModifier,
        pageFlow,
      }
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
