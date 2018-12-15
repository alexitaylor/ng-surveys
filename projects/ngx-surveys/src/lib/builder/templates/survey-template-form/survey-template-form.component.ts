import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import * as survey from '../../../store/survey/survey.actions';
import {INgxSurvey, NgxSurveyState} from '../../../models';
import {Store} from '@ngrx/store';

@Component({
  selector: 'ngxs-survey-template-form',
  templateUrl: './survey-template-form.component.html',
  styleUrls: ['./survey-template-form.component.scss']
})
export class SurveyTemplateFormComponent implements OnInit, OnDestroy {
  @Input() survey: INgxSurvey;

  surveyNameSub$: Subscription;
  surveyDescriptionSub$: Subscription;

  constructor(
    private store: Store<NgxSurveyState>
  ) { }

  ngOnInit() {
    setTimeout(() => {
      if (!this.survey.isLoading) {
        this.handleSurveyNameChange();
        this.handleSurveyDescriptionChange();
      }
    }, 300);
  }

  ngOnDestroy(): void {
    this.surveyNameSub$.unsubscribe();
    this.surveyNameSub$.unsubscribe();
  }

  handleSurveyNameChange() {
    const $surveyName = document.getElementById('surveyName');

    this.surveyNameSub$ = fromEvent($surveyName, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(name => {
      this.store.dispatch(new survey.SurveyNameChangedAction({ name }));
    });
  }

  handleSurveyDescriptionChange() {
    const $surveyDescription = document.getElementById('surveyDescription');

    this.surveyDescriptionSub$ = fromEvent($surveyDescription, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(description => {
      this.store.dispatch(new survey.SurveyDescriptionChangedAction({description}));
    });
  }
}
