import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSurveyViewerComponent } from './ngx-survey-viewer.component';
import {SharedCommonModule} from '../../shared/shared-common.module';
import {BuilderModule} from '../../builder/builder.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedCommonModule,
    BuilderModule
  ],
  declarations: [NgxSurveyViewerComponent],
  exports: [NgxSurveyViewerComponent]
})
export class NgxSurveyViewerModule { }
