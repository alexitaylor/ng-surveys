import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {NgxSurveyState} from '../../store/ngx-survey.state';
import {NgxSurveyStore} from '../../store/ngx-survey.store';

@Component({
  selector: 'ngxs-model-viewer',
  templateUrl: './ngx-model-viewer.component.html',
  styleUrls: ['./ngx-model-viewer.component.scss']
})
export class NgxModelViewerComponent implements OnInit {
  surveyModel$: Observable<NgxSurveyState>;

  constructor(
    private _ngxSurveyStore: NgxSurveyStore,
  ) { }

  ngOnInit() {
    this.surveyModel$ = this._ngxSurveyStore.ngxSurveyState;
  }

}
