import { Type } from '@angular/core';

export interface IQuestionItem {
  component: Type<any>;
  data?: any;
}

export class QuestionItemComponent implements IQuestionItem {
  constructor(public component: Type<any>, public data?: any) {}
}
