import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapValuesPipe} from './pipes/map-values.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MapValuesPipe,
  ],
  exports: [
    MapValuesPipe,
  ],
})
export class SharedCommonModule { }
