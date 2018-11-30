import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortTextComponent } from './question-type/short-text/short-text.component';
import { LongTextComponent } from './question-type/long-text/long-text.component';
import { QuestionBuilderDirective } from './question-builder/question-builder.directive';
import {QuestionBuilderService} from './question-builder/question-builder.service';
import {QuestionBuilderComponent} from './question-builder/question-builder.component';
import { DateComponent } from './question-type/date/date.component';
import { RangeComponent } from './question-type/range/range.component';
import {FormsModule} from '@angular/forms';
import {SharedCommonModule} from '../shared/shared-common.module';
import {OptionTemplateComponent} from './question-type/option-template/option-template.component';
import { RadioCheckboxSelectComponent } from './question-type/radio-checkbox-select/radio-checkbox-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedCommonModule,
  ],
  providers: [
    QuestionBuilderService
  ],
  declarations: [
    ShortTextComponent,
    LongTextComponent,
    DateComponent,
    RangeComponent,
    QuestionBuilderDirective,
    QuestionBuilderComponent,
    OptionTemplateComponent,
    RadioCheckboxSelectComponent,
  ],
  entryComponents: [
    ShortTextComponent,
    LongTextComponent,
    DateComponent,
    RangeComponent,
    RadioCheckboxSelectComponent,
  ],
  exports: [
    ShortTextComponent,
    LongTextComponent,
    QuestionBuilderDirective,
    QuestionBuilderComponent,
    DateComponent,
    RangeComponent,
    OptionTemplateComponent,
    RadioCheckboxSelectComponent,
  ]
})
export class BuilderModule { }
