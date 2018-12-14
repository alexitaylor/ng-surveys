/*
 * Public API Surface of ngx-surveys
 * Intended to enumerate and expose specific functionality for external use
 */

export * from './lib/providers/ngx-surveys.service';
export * from './lib/ngx-surveys.component';
export * from './lib/ngx-surveys.module';


export {
  NgxBuilderViewerComponent,
  NgxBuilderViewerModule,
} from './lib/view/builder-viewer/index';

export {
  NgxSurveyViewerComponent,
  NgxSurveyViewerModule,
} from './lib/view/survey-viewer/index';

export {
  NgxModelViewerComponent,
  NgxModelViewerModule,
} from './lib/view/model-viewer/index';


// Utils
export {
  deserializeUtils,
} from './lib/store/utils';

// Interfaces
export {
  NgxSurveyState,
  INgxSurvey,
  IPage,
  IPageMap,
  IElements,
  IElementsMap,
  IElementsMaps,
  IOptionAnswers,
  IOptionAnswersMap,
  IOptionAnswersMaps,
  IPageFlow,
  IParagraph,
  IQuestion,
  IBuilderOptions,
  IBuilderOptionsBuilder,
  Page,
  Elements,
  OptionAnswers,
  PageFlow,
  Paragraph,
  Question,
  BuilderOptionsModel,
  IElementAndOptionAnswers,
  IPageAndElementAndOptionAnswers,
} from './lib/models/index';
