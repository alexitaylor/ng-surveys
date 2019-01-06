/*
 * Public API Surface of ng-surveys
 * Intended to enumerate and expose specific functionality for external use
 */

export * from './lib/providers/ng-surveys.service';
export * from './lib/ng-surveys.module';


export {
  NgBuilderViewerComponent,
  NgBuilderViewerModule,
} from './lib/view/builder-viewer/index';

export {
  NgSurveyViewerComponent,
  NgSurveyViewerModule,
} from './lib/view/survey-viewer/index';

export {
  NgModelViewerComponent,
  NgModelViewerModule,
} from './lib/view/model-viewer/index';

// Interfaces
export {
  NgSurveyState,
  INgSurvey,
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
