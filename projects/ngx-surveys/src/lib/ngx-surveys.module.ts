import {NgModule} from '@angular/core';

import { NgxBuilderViewerModule } from './view/builder-viewer/ngx-builder-viewer.module';
import { NgxSurveyViewerModule } from './view/survey-viewer/ngx-survey-viewer.module';
import { NgxModelViewerModule } from './view/model-viewer/ngx-model-viewer.module';

import { NgxSurveyStore } from './store/ngx-survey.store';
import { SurveyReducer } from './store/survey/survey.reducer';
import { PagesReducer } from './store/pages/pages.reducer';
import { ElementsReducer } from './store/elements/elements.reducer';
import { OptionAnswersReducer } from './store/option-answers/option-answers.reducer';
import { BuilderOptionsReducer } from './store/builder-options/builder-options.reducer';

@NgModule({
  imports: [
    NgxBuilderViewerModule,
    NgxSurveyViewerModule,
    NgxSurveyViewerModule,
    NgxModelViewerModule,
  ],
  declarations: [ ],
  providers: [ NgxSurveyStore, SurveyReducer, PagesReducer, ElementsReducer, OptionAnswersReducer, BuilderOptionsReducer ],
  exports: [
    NgxBuilderViewerModule,
    NgxSurveyViewerModule,
    NgxModelViewerModule,
  ]
})
export class NgxSurveysModule {}
