import * as utils from '../store/utils';

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
    this.id = id ? id : utils.UUID();
    this.name = name ? name : '';
    this.description = description ? description : '';
    this.summary = summary ? summary : '';
    this.isLoading = isLoading ? isLoading : false;
  }
}
