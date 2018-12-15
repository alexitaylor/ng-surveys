import { Injectable } from '@angular/core';
import {IQuestionItem, QuestionItemComponent} from './question-item.component';
import {LongTextComponent} from '../question-type/long-text/long-text.component';
import {ShortTextComponent} from '../question-type/short-text/short-text.component';
import {DateComponent} from '../question-type/date/date.component';
import {RangeComponent} from '../question-type/range/range.component';
import {IElements} from '../../models/elements.model';
import {RadioCheckboxSelectComponent} from '../question-type/radio-checkbox-select/radio-checkbox-select.component';
import {SelectComponent} from '../question-type/select/select.component';
import {CheckboxComponent} from '../question-type/checkbox/checkbox.component';
import {RadioComponent} from '../question-type/radio/radio.component';

@Injectable()
export class QuestionBuilderService {

  constructor() { }

  getElementTypeComponent(type: string, element: IElements, surveyId: string, isView: boolean): IQuestionItem {
    let title = '', component;
    if (type === 'shortText') {
      component = ShortTextComponent;
      title = isView ? element.question.text : 'Short Text Question Template';
    } else if (type === 'longText') {
      component = LongTextComponent;
      title = isView ? element.question.text : 'Long Text Question Template';
    } else if (type === 'radio') {
      component = isView ? RadioComponent : RadioCheckboxSelectComponent;
      title = isView ? element.question.text : 'Radio Question Template';
    } else if (type === 'checkboxes') {
      component = isView ? CheckboxComponent : RadioCheckboxSelectComponent;
      title = isView ? element.question.text : 'Checkbox Question Template';
    } else if (type === 'select') {
      component = isView ? SelectComponent : RadioCheckboxSelectComponent;
      title = isView ? element.question.text : 'Select Question Template';
    } else if (type === 'date') {
      component = DateComponent;
      title = isView ? element.question.text : 'Date Question Template';
    } else if (type === 'range') {
      component = RangeComponent;
      title = isView ? element.question.text : 'Range Question Template';
    }

    return new QuestionItemComponent(component, {
      title,
      type,
      element,
      surveyId,
      isView,
    });
  }
}
