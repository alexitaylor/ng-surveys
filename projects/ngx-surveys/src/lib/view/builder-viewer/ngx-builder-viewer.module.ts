import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap';

import { NgxBuilderViewerComponent } from './ngx-builder-viewer.component';
import {SharedCommonModule} from '../../shared/shared-common.module';
import {BuilderModule} from '../../builder/builder.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule.forRoot(),
    SharedCommonModule,
    BuilderModule,
  ],
  declarations: [NgxBuilderViewerComponent],
  exports: [NgxBuilderViewerComponent]
})
export class NgxBuilderViewerModule { }
