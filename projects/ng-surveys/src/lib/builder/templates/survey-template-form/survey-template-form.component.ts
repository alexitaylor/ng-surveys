import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {INgSurvey} from '../../../models';
import {SurveyActionTypes} from '../../../store/survey/survey.actions';
import {SurveyReducer} from '../../../store/survey/survey.reducer';

@Component({
  selector: 'ngs-survey-template-form',
  templateUrl: './survey-template-form.component.html',
  styleUrls: ['./survey-template-form.component.scss']
})
export class SurveyTemplateFormComponent implements OnInit, OnDestroy {
  @Input() survey: INgSurvey;

  surveyNameSub$: Subscription;
  surveyDescriptionSub$: Subscription;

  constructor(
    private _surveyReducer: SurveyReducer,
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
      this._surveyReducer.surveyReducer({
        type: SurveyActionTypes.SURVEY_NAME_CHANGED_ACTION,
        payload: { name },
      });
    });
  }

  handleSurveyDescriptionChange() {
    const $surveyDescription = document.getElementById('surveyDescription');

    this.surveyDescriptionSub$ = fromEvent($surveyDescription, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(description => {
      this._surveyReducer.surveyReducer({
        type: SurveyActionTypes.SURVEY_DESCRIPTION_CHANGED_ACTION,
        payload: { description },
      });
    });
  }
}
