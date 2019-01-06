import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {NgSurveyState} from '../../store/ng-survey.state';
import {NgSurveyStore} from '../../store/ng-survey.store';

@Component({
  selector: 'ngs-model-viewer',
  templateUrl: './ng-model-viewer.component.html',
  styleUrls: ['./ng-model-viewer.component.scss']
})
export class NgModelViewerComponent implements OnInit {
  surveyModel$: Observable<NgSurveyState>;

  constructor(
    private _ngSurveyStore: NgSurveyStore,
  ) { }

  ngOnInit() {
    this.surveyModel$ = this._ngSurveyStore.ngSurveyState;
  }

}
