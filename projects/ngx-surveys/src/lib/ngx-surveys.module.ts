import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { NgxSurveysComponent } from './ngx-surveys.component';
import { NgxBuilderViewerModule } from './view/builder-viewer/ngx-builder-viewer.module';
import { NgxSurveyViewerModule } from './view/survey-viewer/ngx-survey-viewer.module';
import { NgxModelViewerModule } from './view/model-viewer/ngx-model-viewer.module';

import {reducers, metaReducers} from './store/ngx-survey.reducer';
import {PagesEffect} from './store/pages/pages.effect';
import {ElementsEffect} from './store/elements/elements.effect';
import {SurveyEffect} from './store/survey/survey.effect';

@NgModule({
  imports: [
    NgxBuilderViewerModule,
    NgxSurveyViewerModule,
    NgxSurveyViewerModule,
    NgxModelViewerModule,
    /**
     * StoreModule.forRoot includes an object containing app and the appReducer
     * appReducer manages the state of the application
     * StoreModule.forRoot() method registers the global providers needed to access the Store
     * throughout the application
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([PagesEffect, ElementsEffect, SurveyEffect]),
  ],
  declarations: [NgxSurveysComponent],
  exports: [
    NgxSurveysComponent,
    NgxBuilderViewerModule,
    NgxSurveyViewerModule,
    NgxModelViewerModule,
  ]
})
export class NgxSurveysModule { }
