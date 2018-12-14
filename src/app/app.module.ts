import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxSurveysModule } from 'ngx-surveys';
import { AppComponent } from './app.component';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {ShellModule} from './shell/shell.module';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ShellModule,
    NgxSurveysModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
