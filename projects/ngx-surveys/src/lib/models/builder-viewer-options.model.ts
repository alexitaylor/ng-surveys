import {Observable} from 'rxjs';
import {NgxSurveyState} from '../store/ngx-survey.state';

export interface IBuilderViewerOptions {
  importSurvey?: IBuilderViewerOptionsBuilder;
  buttons?: IBuilderViewerOptionsBuilder[];
}

export interface IBuilderViewerOptionsBuilder {
  title?: string;
  icon?: string;
  text?: string;
  /**
   * Builder Viewer button callbacks can either return NgxSurveyState
   * state as an Observable to be use to update the library's store.
   * Or accept the current survey state from the library's store.
   * */
  callback: (x: NgxSurveyState) => Observable<NgxSurveyState> | NgxSurveyState | void;
}


