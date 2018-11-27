import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './question-type/checkbox/checkbox.component';
import { RadioComponent } from './question-type/radio/radio.component';
import { ShortTextComponent } from './question-type/short-text/short-text.component';
import { LongTextComponent } from './question-type/long-text/long-text.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CheckboxComponent, RadioComponent, ShortTextComponent, LongTextComponent],
  exports: [CheckboxComponent, RadioComponent, ShortTextComponent, LongTextComponent]
})
export class BuilderModule { }
