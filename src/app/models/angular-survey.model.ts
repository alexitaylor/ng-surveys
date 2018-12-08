import { UUID } from 'angular2-uuid';

export interface IAngularSurvey {
  id?: string;
  name?: string;
  description?: string;
  summary?: string;
}

export class AngularSurvey implements IAngularSurvey {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public summary?: string,
    ) {
    this.id = id ? id : UUID.UUID();
    this.name = name ? name : 'hello world';
    this.description = description ? description : '';
    this.summary = summary ? summary : '';
  }
}
