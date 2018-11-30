import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderViewerComponent } from './builder-viewer/builder-viewer.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';
import { QuestionBuilderContainerComponent } from './templates/question-builder-container/question-builder-container.component';
import {BuilderModule} from '../builder/builder.module';
import {FormsModule} from '@angular/forms';
import {PageBuilderContainerComponent} from './templates/page-builder-container/page-builder-container.component';
import {MapValuesPipe} from '../shared/pipes/map-values.pipe';
import {SharedCommonModule} from '../shared/shared-common.module';

@NgModule({
  imports: [
    CommonModule,
    SharedCommonModule,
    BuilderModule,
    FormsModule,
  ],
  declarations: [
    BuilderViewerComponent,
    ViewerComponent,
    ModelViewerComponent,
    QuestionBuilderContainerComponent,
    PageBuilderContainerComponent,
  ],
  exports: [
    BuilderViewerComponent,
    ViewerComponent,
    ModelViewerComponent,
  ]
})
export class ViewModule { }
