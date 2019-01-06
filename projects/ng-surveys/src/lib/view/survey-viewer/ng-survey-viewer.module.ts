import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSurveyViewerComponent } from './ng-survey-viewer.component';
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
  declarations: [NgSurveyViewerComponent],
  exports: [NgSurveyViewerComponent]
})
export class NgSurveyViewerModule { }
