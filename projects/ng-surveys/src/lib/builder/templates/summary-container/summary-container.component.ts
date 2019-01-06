import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {INgSurvey} from '../../../models/ng-survey.model';
import {NgSurveyStore} from '../../../store/ng-survey.store';
import {SurveyActionTypes} from '../../../store/survey/survey.actions';
import {SurveyReducer} from '../../../store/survey/survey.reducer';


@Component({
  selector: 'ngs-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss']
})
export class SummaryContainerComponent implements OnInit, OnDestroy {
  surveySub: Subscription;
  survey: INgSurvey;

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private _surveyReducer: SurveyReducer,
  ) {
    this.surveySub = this._ngSurveyStore.survey.subscribe(res => {
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
