import { UUID } from 'angular2-uuid';

export interface INgxSurvey {
  id?: string;
  name?: string;
  description?: string;
  summary?: string;
  isLoading?: boolean;
}

export class NgxSurvey implements INgxSurvey {
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
