import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapValuesPipe} from './pipes/map-values.pipe';
import { PageSelectComponent } from './page-select/page-select.component';
import {FormsModule} from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    MapValuesPipe,
    PageSelectComponent,
    LoaderComponent,
  ],
  exports: [
    MapValuesPipe,
    PageSelectComponent,
    LoaderComponent,
  ],
})
export class SharedCommonModule { }
