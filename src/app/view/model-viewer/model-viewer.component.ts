import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';

import {IAngularSurvey} from '../../models/angular-survey.model';
import {AppState} from '../../store/app.state';

@Component({
  selector: 'sb-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent implements OnInit {
  surveyModel$: Observable<IAngularSurvey>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.surveyModel$ = this.store.pipe(select(state => state.survey));
  }

  ngOnInit() {
  }
}
