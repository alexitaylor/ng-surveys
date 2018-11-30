import {IPage, IPageMap, Page} from './page.model';
import { UUID } from 'angular2-uuid';

export interface IAngularSurvey {
  id?: string;
  name?: string;
  pages?: IPageMap;
  description?: string;
}

export class AngularSurvey implements IAngularSurvey {
  constructor(
    public id?: string,
    public name?: string,
    public pages?: IPageMap,
    public description?: string,
    ) {
    const newPage = new Page();
    const pagesMap = new Map<string, IPage>();
    pagesMap.set(newPage.id, newPage);

    this.id = id ? id : UUID.UUID();
    this.name = name ? name : '';
    this.pages = pages ? pages : new Map<string, IPage>(pagesMap);
    this.description = description ? description : '';
  }
}
