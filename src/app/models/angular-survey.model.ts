import {IPage, IPageMap, Page} from './page.model';
import { UUID } from 'angular2-uuid';

export interface IAngularSurvey {
  id?: string;
  name?: string;
  pages?: Map<string, IPage>;
  description?: string;
}

export class AngularSurvey implements IAngularSurvey {
  constructor(
    public id?: string,
    public name?: string,
    public pages?: Map<string, IPage>,
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
