import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { TestPipe } from './test.pipe';
import { ViewModule } from './view/view.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';
import { BuilderModule } from './builder/builder.module';
import {reducers} from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TestPipe,
    NavbarComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    ViewModule,
    BuilderModule,
    /**
     * StoreModule.forRoot includes an object containing app and the appReducer
     * appReducer manages the state of the application
     * StoreModule.forRoot() method registers the global providers needed to access the Store
     * throughout the application
     */
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
