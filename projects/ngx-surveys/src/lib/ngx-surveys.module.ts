import {ModuleWithProviders, NgModule} from '@angular/core';
import {select, Store, StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {ROUTER_PROVIDERS, RouterModule} from '@angular/router/src/router_module';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import { NgxSurveysComponent } from './ngx-surveys.component';
import { NgxBuilderViewerModule } from './view/builder-viewer/ngx-builder-viewer.module';
import { NgxSurveyViewerModule } from './view/survey-viewer/ngx-survey-viewer.module';
import { NgxModelViewerModule } from './view/model-viewer/ngx-model-viewer.module';

import {reducers, metaReducers} from './store/ngx-survey.reducer';
import {PagesEffect} from './store/pages/pages.effect';
import {ElementsEffect} from './store/elements/elements.effect';
import {SurveyEffect} from './store/survey/survey.effect';
import {NgxSurveyViewerComponent} from './view/survey-viewer';
import {IPageMap} from './models/page.model';
import {NgxSurveyState} from './store/ngx-survey.state';
import * as fromRoot from './store/ngx-survey.reducer';

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
export class NgxSurveysModule {
  pagesSub: Subscription;
  surveyIdSub: Subscription;
  surveyId: string;
  pages: IPageMap;

  constructor(
    private store: Store<NgxSurveyState>,
    private router: Router
  ) {
    this.surveyIdSub = store.pipe(select(fromRoot.getSurveyId)).subscribe(res => {
      this.surveyId = res;
    });
    this.pagesSub = store.pipe(select(fromRoot.getPagesBySurveyId, { surveyId: this.surveyId })).subscribe(res => {
      this.pages = res;
    });

    this.createPagesRoutes();
  }

  /**
   * Dynamically create new routes with stored page data.
   * This will update the app's router configuration.
   * Creates a new route per page.
   */
  createPagesRoutes() {
    const pageRoute = [];
    if (!!this.pages) {
      this.pages.forEach(page => {
        pageRoute.push({
          path: `viewer/${page.id}`,
          component: NgxSurveyViewerComponent,
        });
      });

      this.router.config.forEach(route => {
        if (route.path === '') {
          route.children.unshift(...pageRoute);
        }
      });
    }
  }
}
