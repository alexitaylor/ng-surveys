import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import { AppComponent } from './app.component';
import { TestPipe } from './test.pipe';
import { ViewModule } from './view/view.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';
import { BuilderModule } from './builder/builder.module';
import {reducers, metaReducers} from './store/app.reducer';
import { SharedCommonModule } from './shared/shared-common.module';
import {PagesEffect} from './store/pages/pages.effect';
import {ElementsEffect} from './store/elements/elements.effect';

@NgModule({
  imports: [
    BrowserModule,
    SharedCommonModule,
    ViewModule,
    BuilderModule,
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
    EffectsModule.forRoot([PagesEffect, ElementsEffect]),
  ],
  declarations: [
    AppComponent,
    TestPipe,
    NavbarComponent,
    ContentComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
