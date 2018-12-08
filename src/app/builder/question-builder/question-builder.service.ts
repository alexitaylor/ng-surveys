import { Injectable } from '@angular/core';
import {IQuestionItem, QuestionItemComponent} from './question-item.component';
import {LongTextComponent} from '../question-type/long-text/long-text.component';
import {ShortTextComponent} from '../question-type/short-text/short-text.component';
import {DateComponent} from '../question-type/date/date.component';
import {RangeComponent} from '../question-type/range/range.component';
import {IElements} from '../../models/elements.model';
import {RadioCheckboxSelectComponent} from '../question-type/radio-checkbox-select/radio-checkbox-select.component';

@Injectable()
export class QuestionBuilderService {

  constructor() { }

  getElementTypeComponent(type: string, element: IElements, surveyId: string): IQuestionItem {
    let title = '', component;
    if (type === 'shortText') {
      component = ShortTextComponent;
      title = 'Short Text Question Template';
    } else if (type === 'longText') {
      component = LongTextComponent;
      title = 'Long Text Question Template';
    } else if (type === 'radio') {
      component = RadioCheckboxSelectComponent;
      title = 'Radio Question Template';
    } else if (type === 'checkboxes') {
      component = RadioCheckboxSelectComponent;
      title = 'Checkbox Question Template';
    } else if (type === 'select') {
      component = RadioCheckboxSelectComponent;
      title = 'Select Question Template';
    } else if (type === 'date') {
      component = DateComponent;
      title = 'Date Question Template';
    } else if (type === 'range') {
      component = RangeComponent;
      title = 'Range Question Template';
    }

    return new QuestionItemComponent(component, {
      title,
      type,
      element,
      surveyId,
    });
  }
}
