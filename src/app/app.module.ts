import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {select, Store, StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TestPipe } from './test.pipe';
import { ViewModule } from './view/view.module';
import { ContentComponent } from './layouts/content/content.component';
import { BuilderModule } from './builder/builder.module';
import {reducers, metaReducers} from './store/app.reducer';
import { SharedCommonModule } from './shared/shared-common.module';
import {PagesEffect} from './store/pages/pages.effect';
import {ElementsEffect} from './store/elements/elements.effect';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {ShellModule} from './shell/shell.module';
import {Router} from '@angular/router';
import {ViewerComponent} from './view/viewer/viewer.component';
import * as fromRoot from './store/app.reducer';
import {Subscription} from 'rxjs';
import {IPageMap} from './models/page.model';
import {AppState} from './store/app.state';
import {SurveyEffect} from './store/survey/survey.effect';

@NgModule({
  imports: [
    BrowserModule,
    SharedCommonModule,
    ViewModule,
    BuilderModule,
    ShellModule,
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
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    TestPipe,
    ContentComponent,
    NotFoundComponent,
  ],
  entryComponents: [AppComponent, NotFoundComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {
  pagesSub: Subscription;
  surveyIdSub: Subscription;
  surveyId: string;
  pages: IPageMap;

  constructor(
    private store: Store<AppState>,
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

  createPagesRoutes() {
    const pageRoute = [];
    if (!!this.pages) {
      this.pages.forEach(page => {
        pageRoute.push({
          path: `viewer/${page.id}`,
          component: ViewerComponent,
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
