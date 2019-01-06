import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {appInitialState, NgSurveyState} from './ng-survey.state';
import {IBuilderOptions, IElementsMaps, INgSurvey, IOptionAnswersMaps, IPageMap} from '../models';
import { deepCopy } from './utils';

@Injectable()
export class NgSurveyStore {

  ngSurveyState: Observable<NgSurveyState>;
  private _ngSurveyState: BehaviorSubject<NgSurveyState>;

  survey: Observable<INgSurvey>;
  private _survey: BehaviorSubject<INgSurvey>;

  pages: Observable<IPageMap>;
  private _pages: BehaviorSubject<IPageMap>;

  elements: Observable<IElementsMaps>;
  private _elements: BehaviorSubject<IElementsMaps>;

  optionAnswers: Observable<IOptionAnswersMaps>;
  private _optionAnswers: BehaviorSubject<IOptionAnswersMaps>;

  builderOptions: Observable<IBuilderOptions>;
  private _builderOptions: BehaviorSubject<IBuilderOptions>;

  public dataStore: NgSurveyState = appInitialState;


  constructor() {
    this._ngSurveyState = <BehaviorSubject<NgSurveyState>>new BehaviorSubject(this.dataStore);
    this.ngSurveyState = this._ngSurveyState.asObservable();

    this._survey = <BehaviorSubject<INgSurvey>>new BehaviorSubject(this.dataStore.survey);
    this.survey = this._survey.asObservable();

    this._pages = <BehaviorSubject<IPageMap>>new BehaviorSubject(this.dataStore.pages);
    this.pages = this._pages.asObservable();

    this._elements = <BehaviorSubject<IElementsMaps>>new BehaviorSubject(this.dataStore.elements);
    this.elements = this._elements.asObservable();

    this._optionAnswers = <BehaviorSubject<IOptionAnswersMaps>>new BehaviorSubject(this.dataStore.optionAnswers);
    this.optionAnswers = this._optionAnswers.asObservable();

    this._builderOptions = <BehaviorSubject<IBuilderOptions>>new BehaviorSubject(this.dataStore.builderOptions);
    this.builderOptions = this._builderOptions.asObservable();
  }

  updateNgSurveyState(
    payload: INgSurvey | IPageMap | IElementsMaps | IOptionAnswersMaps | IBuilderOptions
  ) {
    const newState = Object.assign({}, deepCopy(this.dataStore), payload);
    this.dataStore = newState;
    this._ngSurveyState.next(newState);
  }

  updateSurvey(survey: INgSurvey) {
    this.dataStore.survey = survey;
    this._survey.next(survey);
    this.updateNgSurveyState(survey);
  }

  updatePages(pages: IPageMap) {
    this.dataStore.pages = pages;
    this._pages.next(pages);
    this.updateNgSurveyState(pages);
  }

  updateElements(elements: IElementsMaps) {
    this.dataStore.elements = elements;
    this._elements.next(elements);
    this.updateNgSurveyState(elements);
  }

  updateOptionAnswers(optionAnswers: IOptionAnswersMaps) {
    this.dataStore.optionAnswers = optionAnswers;
    this._optionAnswers.next(optionAnswers);
    this.updateNgSurveyState(optionAnswers);
  }

  updateBuilderOptions(builderOptions: IBuilderOptions) {
    this.dataStore.builderOptions = builderOptions;
    this._builderOptions.next(builderOptions);
    this.updateNgSurveyState(builderOptions);
  }

}
