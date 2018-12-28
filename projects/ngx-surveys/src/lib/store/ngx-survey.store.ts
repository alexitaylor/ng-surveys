import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {appInitialState, NgxSurveyState} from './ngx-survey.state';
import {IBuilderOptions, IElementsMaps, INgxSurvey, IOptionAnswersMaps, IPageMap} from '../models';
import { deepCopy } from './utils';

@Injectable()
export class NgxSurveyStore {

  ngxSurveyState: Observable<NgxSurveyState>;
  private _ngxSurveyState: BehaviorSubject<NgxSurveyState>;

  survey: Observable<INgxSurvey>;
  private _survey: BehaviorSubject<INgxSurvey>;

  pages: Observable<IPageMap>;
  private _pages: BehaviorSubject<IPageMap>;

  elements: Observable<IElementsMaps>;
  private _elements: BehaviorSubject<IElementsMaps>;

  optionAnswers: Observable<IOptionAnswersMaps>;
  private _optionAnswers: BehaviorSubject<IOptionAnswersMaps>;

  builderOptions: Observable<IBuilderOptions>;
  private _builderOptions: BehaviorSubject<IBuilderOptions>;

  public dataStore: NgxSurveyState = appInitialState;


  constructor() {
    this._ngxSurveyState = <BehaviorSubject<NgxSurveyState>>new BehaviorSubject(this.dataStore);
    this.ngxSurveyState = this._ngxSurveyState.asObservable();

    this._survey = <BehaviorSubject<INgxSurvey>>new BehaviorSubject(this.dataStore.survey);
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

  updateNgxSurveyState(
    payload: INgxSurvey | IPageMap | IElementsMaps | IOptionAnswersMaps | IBuilderOptions
  ) {
    const newState = Object.assign({}, deepCopy(this.dataStore), payload);
    this.dataStore = newState;
    this._ngxSurveyState.next(newState);
  }

  updateSurvey(survey: INgxSurvey) {
    this.dataStore.survey = survey;
    this._survey.next(survey);
    this.updateNgxSurveyState(survey);
  }

  updatePages(pages: IPageMap) {
    this.dataStore.pages = pages;
    this._pages.next(pages);
    this.updateNgxSurveyState(pages);
  }

  updateElements(elements: IElementsMaps) {
    this.dataStore.elements = elements;
    this._elements.next(elements);
    this.updateNgxSurveyState(elements);
  }

  updateOptionAnswers(optionAnswers: IOptionAnswersMaps) {
    this.dataStore.optionAnswers = optionAnswers;
    this._optionAnswers.next(optionAnswers);
    this.updateNgxSurveyState(optionAnswers);
  }

  updateBuilderOptions(builderOptions: IBuilderOptions) {
    this.dataStore.builderOptions = builderOptions;
    this._builderOptions.next(builderOptions);
    this.updateNgxSurveyState(builderOptions);
  }

}
