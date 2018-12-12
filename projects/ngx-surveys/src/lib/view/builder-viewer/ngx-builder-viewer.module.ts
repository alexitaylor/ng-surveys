import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxBuilderViewerComponent } from './ngx-builder-viewer.component';
import {SharedCommonModule} from '../../shared/shared-common.module';
import {BuilderModule} from '../../builder/builder.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedCommonModule,
    BuilderModule,
  ],
  declarations: [NgxBuilderViewerComponent],
  exports: [NgxBuilderViewerComponent]
})
export class NgxBuilderViewerModule { }
