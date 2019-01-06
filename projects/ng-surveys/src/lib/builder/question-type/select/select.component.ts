import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IOptionAnswersMap} from '../../../models/option-answers.model';
import {Subscription} from 'rxjs';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';
import {NgSurveyStore} from '../../../store/ng-survey.store';

@Component({
  selector: 'ngs-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input() data: any;
  optionAnswers: IOptionAnswersMap;
  optionAnswersSub: Subscription;
  item: any;

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

  handleSelect(answer, pageFlow) {
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
