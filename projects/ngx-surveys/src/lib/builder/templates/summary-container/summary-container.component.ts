import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {Store, select} from '@ngrx/store';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import {SurveySummaryChangedAction} from '../../../store/survey/survey.actions';
import {NgxSurveyState} from '../../../store/ngx-survey.state';
import {INgxSurvey} from '../../../models/ngx-survey.model';
import * as fromRoot from '../../../store/ngx-survey.reducer';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular/ckeditor.component';


@Component({
  selector: 'ngxs-summary-container',
  templateUrl: './summary-container.component.html',
  styleUrls: ['./summary-container.component.scss']
})
export class SummaryContainerComponent implements OnInit, OnDestroy {
  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!</p>'
  };
  surveySub: Subscription;
  survey: INgxSurvey;

  surveyDataSubject = new Subject<any>();

  constructor(
    private store: Store<NgxSurveyState>,
  ) {
    this.surveySub = store.pipe(select(fromRoot.getSurvey)).subscribe(res => {
      this.survey = res;
      this.model.editorData = this.survey.summary;
    });
  }

  ngOnInit() {
    this.surveyDataSubject.pipe(
      map((res: any) => res),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(summary => {
      this.store.dispatch(new SurveySummaryChangedAction({ summary }));
    });
  }

  ngOnDestroy() {
    this.surveySub.unsubscribe();
  }

  onEditorChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.surveyDataSubject.next(data);
  }

}
