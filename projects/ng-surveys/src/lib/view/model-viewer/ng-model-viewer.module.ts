import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModelViewerComponent } from './ng-model-viewer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgModelViewerComponent],
  exports: [NgModelViewerComponent]
})
export class NgModelViewerModule { }
