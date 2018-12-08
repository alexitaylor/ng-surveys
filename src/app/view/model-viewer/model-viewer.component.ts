import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';

import {AppState} from '../../store/app.state';

@Component({
  selector: 'sb-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent implements OnInit {
  surveyModel$: Observable<AppState>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.surveyModel$ = this.store.pipe(select(state => state));
  }

  ngOnInit() {
  }
}
