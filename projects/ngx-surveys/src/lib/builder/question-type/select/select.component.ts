import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgxSurveyState} from '../../../store/ngx-survey.state';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../store/ngx-survey.reducer';
import {IOptionAnswersMap} from '../../../models/option-answers.model';
import {Subscription} from 'rxjs';
import * as elements from '../../../store/elements/elements.actions';

@Component({
  selector: 'ngxs-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input() data: any;
  optionAnswers: IOptionAnswersMap;
  optionAnswersSub: Subscription;
  item: any;

  constructor(
    private store: Store<NgxSurveyState>,
  ) { }

  ngOnInit() {
    this.optionAnswersSub = this.store.pipe(select(fromRoot.getOptionAnswersByElementId,
      { elementId: this.data.element.id }))
      .subscribe(res => {
        this.optionAnswers = res;
    });
  }

  ngOnDestroy() {
    this.optionAnswersSub.unsubscribe();
  }

  handleSelect(answer, pageFlow) {
    this.store.dispatch(new elements.UpdateQuestionAnswerAction({
      pageId: this.data.element.pageId,
      elementId: this.data.element.id,
      answer,
      pageFlowModifier: this.data.element.question.pageFlowModifier,
      pageFlow,
    }));
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
