import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderViewerComponent } from './builder-viewer/builder-viewer.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';
import { QuestionBuilderContainerComponent } from './templates/question-builder-container/question-builder-container.component';
import {BuilderModule} from '../builder/builder.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BuilderModule,
    FormsModule,
  ],
  declarations: [BuilderViewerComponent, ViewerComponent, ModelViewerComponent, QuestionBuilderContainerComponent],
  exports: [BuilderViewerComponent, ViewerComponent, ModelViewerComponent]
})
export class ViewModule { }
