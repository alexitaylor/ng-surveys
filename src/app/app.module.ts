import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgSurveysModule } from 'ng-surveys';
import { AppComponent } from './app.component';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {ShellModule} from './shell/shell.module';
import {AppRoutingModule} from './app-routing.module';
import {BuilderViewerContainerComponent} from './layouts/builder-viewer-container/builder-viewer-container.component';
import { ModelViewerContainerComponent } from './layouts/model-viewer-container/model-viewer-container.component';
import {HttpClientModule} from '@angular/common/http';
import { SurveyViewerContainerComponent } from './layouts/survey-viewer-container/survey-viewer-container.component';
// import {StoreModule} from '@ngrx/store';
// import {reducers, metaReducers} from './store/ng-survey.reducer';
// import {StoreDevtoolsModule} from '@ngrx/store-devtools';
// import {EffectsModule} from '@ngrx/effects';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ShellModule,
    NgSurveysModule,
    /**
     * TODO
     * StoreModule.forRoot includes an object containing app and the appReducer
     * appReducer manages the state of the application
     * StoreModule.forRoot() method registers the global providers needed to access the Store
     * throughout the application
     */
    // StoreModule.forRoot(reducers, { metaReducers }),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25, // Retains last 25 states
    // }),
    // EffectsModule.forRoot([PagesEffect, ElementsEffect, SurveyEffect]),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    BuilderViewerContainerComponent,
    ModelViewerContainerComponent,
    SurveyViewerContainerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
