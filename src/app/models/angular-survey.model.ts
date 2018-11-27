import {IPageFlow} from './page-flow.model';
import {IElements} from './elements.model';

export interface IAngularSurvey {
  id: number;
  number: number;
  name: string;
  pageFlow: IPageFlow;
  elements: IElements[];
  description?: string;
}

export class AngularSurvey implements IAngularSurvey {
  constructor(
    public id: number,
    public number: number,
    public name: string,
    public pageFlow: IPageFlow,
    public elements: IElements[],
    public description?: string,
    ) {}
}
