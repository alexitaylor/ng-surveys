import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxSurveysModule } from 'ngx-surveys';
import { AppComponent } from './app.component';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {ShellModule} from './shell/shell.module';
import {AppRoutingModule} from './app-routing.module';
import {BuilderViewerContainerComponent} from './layouts/builder-viewer-container/builder-viewer-container.component';
import { ModelViewerContainerComponent } from './layouts/model-viewer-container/model-viewer-container.component';
import {HttpClientModule} from '@angular/common/http';
import { SurveyViewerContainerComponent } from './layouts/survey-viewer-container/survey-viewer-container.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ShellModule,
    NgxSurveysModule,
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
