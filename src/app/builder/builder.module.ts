import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './question-type/checkbox/checkbox.component';
import { RadioComponent } from './question-type/radio/radio.component';
import { ShortTextComponent } from './question-type/short-text/short-text.component';
import { LongTextComponent } from './question-type/long-text/long-text.component';
import { QuestionBuilderDirective } from './question-builder/question-builder.directive';
import {QuestionBuilderService} from './question-builder/question-builder.service';
import {QuestionBuilderComponent} from './question-builder/question-builder.component';
import { SelectComponent } from './question-type/select/select.component';
import { DateComponent } from './question-type/date/date.component';
import { RangeComponent } from './question-type/range/range.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    QuestionBuilderService
  ],
  declarations: [
    CheckboxComponent,
    RadioComponent,
    ShortTextComponent,
    LongTextComponent,
    SelectComponent,
    DateComponent,
    RangeComponent,
    QuestionBuilderDirective,
    QuestionBuilderComponent,
  ],
  entryComponents: [
    CheckboxComponent,
    RadioComponent,
    ShortTextComponent,
    LongTextComponent,
    SelectComponent,
    DateComponent,
    RangeComponent,
  ],
  exports: [
    CheckboxComponent,
    RadioComponent,
    ShortTextComponent,
    LongTextComponent,
    QuestionBuilderDirective,
    QuestionBuilderComponent,
    SelectComponent,
    DateComponent,
    RangeComponent
  ]
})
export class BuilderModule { }
