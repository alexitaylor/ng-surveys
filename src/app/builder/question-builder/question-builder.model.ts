export interface IQuestionBuilder {
  data?: any;
}

export class QuestionBuilder implements IQuestionBuilder {
  constructor(public data?: any) {}
}
