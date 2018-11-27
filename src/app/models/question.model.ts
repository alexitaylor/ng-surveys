import {IOfferedAnswers} from './offered-answers.model';

export interface IQuestion {
  id: number;
  text: string;
  type: string;
  required: boolean;
  pageFlowModifier: boolean;
  offeredAnswers?: IOfferedAnswers[];
}

export class Question implements IQuestion {
  constructor(
    public id: number,
    public text: string,
    public type: string,
    public required: boolean,
    public pageFlowModifier: boolean,
    public offeredAnswers?: IOfferedAnswers[],
  ) {}
}
