import {Observable} from 'rxjs';
import {NgSurveyState} from '../store/ng-survey.state';
import {IElementAndOptionAnswers} from './element-and-option-answers.model';
import {IPageAndElementAndOptionAnswers} from './page-and-element-and-option-answers.model';

export interface IBuilderOptions {
  importSurvey?: IBuilderImportSurveyOptionsBuilder;
  surveyButtons?: IBuilderSurveyButtonsOptionsBuilder[];
  importPage?: IBuilderImportPageOptionsBuilder;
  pageButtons?: IBuilderPageButtonsOptionsBuilder[];
  importElement?: IBuilderImportElementOptionsBuilder;
  elementButtons?: IBuilderElementButtonsOptionsBuilder[];
}

export class BuilderOptionsModel implements IBuilderOptions {
  constructor(
    public importSurvey?: IBuilderImportSurveyOptionsBuilder,
    public surveyButtons?: IBuilderSurveyButtonsOptionsBuilder[],
    public importPage?: IBuilderImportPageOptionsBuilder,
    public pageButtons?: IBuilderPageButtonsOptionsBuilder[],
    public importElement?: IBuilderImportElementOptionsBuilder,
    public elementButtons?: IBuilderElementButtonsOptionsBuilder[],
  ) {
    this.importSurvey = importSurvey ? importSurvey : null;
    this.surveyButtons = surveyButtons ? surveyButtons : null;
    this.importPage = importPage ? importPage : null;
    this.pageButtons = pageButtons ? pageButtons : null;
    this.importElement = importElement ? importElement : null;
    this.elementButtons = elementButtons ? elementButtons : null;
  }
}

export interface IBuilderImportOptionsBuilder {
  title?: string;
  icon?: string;
  text?: string;
}

export interface IBuilderOptionsBuilder {
  title: string;
  icon: string;
  text: string;
}

/**
 * Import button callback returns state as an Observable to be
 * used to update the library's store.
 * And custom button callbacks accept the current survey state from the library's store.
 * */

export interface IBuilderImportSurveyOptionsBuilder extends IBuilderImportOptionsBuilder {
  callback: () => Observable<NgSurveyState> | NgSurveyState;
}

export interface IBuilderSurveyButtonsOptionsBuilder extends IBuilderOptionsBuilder {
  callback: (x: NgSurveyState) => void;
}

export interface IBuilderImportPageOptionsBuilder extends IBuilderImportOptionsBuilder {
  callback: () => Observable<IPageAndElementAndOptionAnswers> | IPageAndElementAndOptionAnswers;
}

export interface IBuilderPageButtonsOptionsBuilder extends IBuilderOptionsBuilder {
  callback: (x: IPageAndElementAndOptionAnswers) => void;
}

export interface IBuilderElementButtonsOptionsBuilder extends IBuilderOptionsBuilder {
  callback: (x: IElementAndOptionAnswers) => void;
}

export interface IBuilderImportElementOptionsBuilder extends IBuilderImportOptionsBuilder {
  callback: () => Observable<IElementAndOptionAnswers> | IElementAndOptionAnswers;
}


