import {NgModule} from '@angular/core';

import { NgBuilderViewerModule } from './view/builder-viewer/ng-builder-viewer.module';
import { NgSurveyViewerModule } from './view/survey-viewer/ng-survey-viewer.module';
import { NgModelViewerModule } from './view/model-viewer/ng-model-viewer.module';

import { NgSurveyStore } from './store/ng-survey.store';
import { SurveyReducer } from './store/survey/survey.reducer';
import { PagesReducer } from './store/pages/pages.reducer';
import { ElementsReducer } from './store/elements/elements.reducer';
import { OptionAnswersReducer } from './store/option-answers/option-answers.reducer';
import { BuilderOptionsReducer } from './store/builder-options/builder-options.reducer';

@NgModule({
  imports: [
    NgBuilderViewerModule,
    NgSurveyViewerModule,
    NgSurveyViewerModule,
    NgModelViewerModule,
  ],
  declarations: [ ],
  providers: [ NgSurveyStore, SurveyReducer, PagesReducer, ElementsReducer, OptionAnswersReducer, BuilderOptionsReducer ],
  exports: [
    NgBuilderViewerModule,
    NgSurveyViewerModule,
    NgModelViewerModule,
  ]
})
export class NgSurveysModule {}
