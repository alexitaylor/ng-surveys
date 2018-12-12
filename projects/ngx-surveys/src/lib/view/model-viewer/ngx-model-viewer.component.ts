import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';

import {NgxSurveyState} from '../../store/ngx-survey.state';

@Component({
  selector: 'ngxs-ngx-model-viewer',
  templateUrl: './ngx-model-viewer.component.html',
  styleUrls: ['./ngx-model-viewer.component.scss']
})
export class NgxModelViewerComponent implements OnInit {
  surveyModel$: Observable<NgxSurveyState>;

  constructor(
    private store: Store<NgxSurveyState>,
  ) { }

  ngOnInit() {
    this.surveyModel$ = this.store.pipe(select(state => state));
  }

}
