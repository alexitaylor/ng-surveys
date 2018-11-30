import {Component, Input, OnInit} from '@angular/core';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import {IOptionAnswersMap} from '../../../models/option-answers.model';
import {IElements} from '../../../models/elements.model';
import {Observable} from 'rxjs';
import {SurveyUpdateQuestionPageFlowModifierAction} from '../../../store/survey/survey.actions';

@Component({
  selector: 'sb-radio-checkbox-select',
  templateUrl: './radio-checkbox-select.component.html',
  styleUrls: ['./radio-checkbox-select.component.scss']
})
export class RadioCheckboxSelectComponent implements OnInit {
  @Input() data: any;

  element: IElements;
  optionAnswers$: Observable<IOptionAnswersMap>;
  optionAnswersSize: number;
  pageId: string;
  isPageNavChecked = false;

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.element = this.data.element;
    this.pageId = this.data.element.pageId;
    this.optionAnswers$ = this.store.pipe(
      select(fromRoot.getOptionAnswers,
        { pageId: this.pageId, elementId: this.element.id }
        ));

    this.optionAnswers$.subscribe(res => {
      this.optionAnswersSize = res.size;
    });
  }

  togglePageNavChecked(e) {
    this.isPageNavChecked = e.target.checked;
    this.store.dispatch(new SurveyUpdateQuestionPageFlowModifierAction(
      { pageId: this.pageId,
        elementId: this.element.id,
        pageFlowModifier: this.isPageNavChecked
      }));
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
