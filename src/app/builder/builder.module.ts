import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { ShortTextComponent } from './question-type/short-text/short-text.component';
import { LongTextComponent } from './question-type/long-text/long-text.component';
import { QuestionBuilderDirective } from './question-builder/question-builder.directive';
import {QuestionBuilderService} from './question-builder/question-builder.service';
import {QuestionBuilderComponent} from './question-builder/question-builder.component';
import { DateComponent } from './question-type/date/date.component';
import { RangeComponent } from './question-type/range/range.component';
import {SharedCommonModule} from '../shared/shared-common.module';
import {OptionTemplateComponent} from './question-type/option-template/option-template.component';
import { RadioCheckboxSelectComponent } from './question-type/radio-checkbox-select/radio-checkbox-select.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import { SelectComponent } from './question-type/select/select.component';
import { CheckboxComponent } from './question-type/checkbox/checkbox.component';
import { RadioComponent } from './question-type/radio/radio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    SharedCommonModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
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
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
  ],
  entryComponents: [
    ShortTextComponent,
    LongTextComponent,
    DateComponent,
    RangeComponent,
    RadioCheckboxSelectComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
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
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
  ]
})
export class BuilderModule { }
