import { UUID } from 'angular2-uuid';

export interface IAngularSurvey {
  id?: string;
  name?: string;
  description?: string;
  summary?: string;
  isLoading?: boolean;
}

export class AngularSurvey implements IAngularSurvey {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public summary?: string,
    public isLoading?: boolean,
    ) {
    this.id = id ? id : UUID.UUID();
    this.name = name ? name : 'hello world';
    this.description = description ? description : '';
    this.summary = summary ? summary : '';
    this.isLoading = isLoading ? isLoading : false;
  }
}
