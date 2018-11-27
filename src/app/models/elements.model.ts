import {IQuestion} from './question.model';

export interface IElements {
  id: number;
  orderNo: number;
  type: string;
  question: IQuestion;
}

export class Elements implements IElements {
  constructor(
    public id: number,
    public orderNo: number,
    public type: string,
    public question: IQuestion,
  ) {}
}
