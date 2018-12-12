import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapValuesPipe} from './pipes/map-values.pipe';
import { PageSelectComponent } from './page-select/page-select.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    MapValuesPipe,
    PageSelectComponent,
  ],
  exports: [
    MapValuesPipe,
    PageSelectComponent,
  ],
})
export class SharedCommonModule { }
