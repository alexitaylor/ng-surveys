import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {INgxSurvey} from '../../../models/ngx-survey.model';
import {NgxSurveyStore} from '../../../store/ngx-survey.store';
import {SurveyActionTypes} from '../../../store/survey/survey.actions';
import {SurveyReducer} from '../../../store/survey/survey.reducer';


@Component({
  selector: 'ngxs-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss']
})
export class SummaryContainerComponent implements OnInit, OnDestroy {
  surveySub: Subscription;
  survey: INgxSurvey;

  constructor(
    private _ngxSurveyStore: NgxSurveyStore,
    private _surveyReducer: SurveyReducer,
  ) {
    this.surveySub = this._ngxSurveyStore.survey.subscribe(res => {
      this.survey = res;
    });
  }

  ngOnInit() {}

  handleEditorEvent(summary: string) {
    this._surveyReducer.surveyReducer({
      type: SurveyActionTypes.SURVEY_SUMMARY_CHANGED_ACTION,
      payload: { summary },
    });
  }

  ngOnDestroy() {
    this.surveySub.unsubscribe();
  }

}
