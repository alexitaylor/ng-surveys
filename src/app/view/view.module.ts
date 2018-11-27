import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder/builder.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';

@NgModule({
  declarations: [BuilderComponent, ViewerComponent, ModelViewerComponent],
  imports: [
    CommonModule
  ],
  exports: [BuilderComponent, ViewerComponent, ModelViewerComponent]
})
export class ViewModule { }
