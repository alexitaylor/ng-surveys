import { Injectable } from '@angular/core';
import {IQuestionItem, QuestionItemComponent} from './question-item.component';
import {LongTextComponent} from '../question-type/long-text/long-text.component';
import {ShortTextComponent} from '../question-type/short-text/short-text.component';
import {RadioComponent} from '../question-type/radio/radio.component';
import {CheckboxComponent} from '../question-type/checkbox/checkbox.component';
import {SelectComponent} from '../question-type/select/select.component';
import {DateComponent} from '../question-type/date/date.component';
import {RangeComponent} from '../question-type/range/range.component';

@Injectable()
export class QuestionBuilderService {

  constructor() { }

  getShortText(): IQuestionItem {
    return new QuestionItemComponent(ShortTextComponent, {
      title: 'Short Text Question Template'
    });
  }

  getLongText(): IQuestionItem {
    return new QuestionItemComponent(LongTextComponent, {
      title: 'Long Text Question Template',
    });
  }

  getRadio(): IQuestionItem {
    return new QuestionItemComponent(RadioComponent, {
      title: 'Radio Question Template'
    });
  }

  getCheckbox(): IQuestionItem {
    return new QuestionItemComponent(CheckboxComponent, {
      title: 'Checkbox Question Template'
    });
  }

  getSelect(): IQuestionItem {
    return new QuestionItemComponent(SelectComponent, {
      title: 'Select Question Template'
    });
  }

  getDate(): IQuestionItem {
    return new QuestionItemComponent(DateComponent, {
      title: 'Date Question Template'
    });
  }

  getRange(): IQuestionItem {
    return new QuestionItemComponent(RangeComponent, {
      title: 'Range Question Template'
    });
  }
}
