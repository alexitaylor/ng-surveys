import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxModelViewerComponent } from './ngx-model-viewer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxModelViewerComponent],
  exports: [NgxModelViewerComponent]
})
export class NgxModelViewerModule { }
