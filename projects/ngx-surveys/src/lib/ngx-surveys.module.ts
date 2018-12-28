import {NgModule} from '@angular/core';

import { NgxBuilderViewerModule } from './view/builder-viewer/ngx-builder-viewer.module';
import { NgxSurveyViewerModule } from './view/survey-viewer/ngx-survey-viewer.module';
import { NgxModelViewerModule } from './view/model-viewer/ngx-model-viewer.module';

import { NgxSurveyStore } from './store/ngx-survey.store';
import { SurveyReducer } from './store/survey/survey.reducer';
import { PagesReducer } from './store/pages/pages.reducer';

@NgModule({
  imports: [
    NgxBuilderViewerModule,
    NgxSurveyViewerModule,
    NgxSurveyViewerModule,
    NgxModelViewerModule,
  ],
  declarations: [ ],
  providers: [ NgxSurveyStore, SurveyReducer, PagesReducer ],
  exports: [
    NgxBuilderViewerModule,
    NgxSurveyViewerModule,
    NgxModelViewerModule,
  ]
})
export class NgxSurveysModule {}
