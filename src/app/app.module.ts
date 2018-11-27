import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestPipe } from './test.pipe';
import { ViewModule } from './view/view.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ContentComponent } from './layouts/content/content.component';
import { BuilderModule } from './builder/builder.module';

@NgModule({
  declarations: [
    AppComponent,
    TestPipe,
    NavbarComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    ViewModule,
    BuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
