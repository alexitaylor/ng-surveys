import {IPage, IPageMap, Page} from './page.model';
import { UUID } from 'angular2-uuid';
import {Elements, IElements, IElementsMap} from './elements.model';

export interface IAngularSurvey {
  id?: string;
  name?: string;
  pages?: IPageMap;
  // elements?: Map<string, IElementsMap>;
  description?: string;
}

export class AngularSurvey implements IAngularSurvey {
  constructor(
    public id?: string,
    public name?: string,
    public pages?: IPageMap,
    // public elements?: Map<string, IElementsMap>,
    public description?: string,
    ) {
    const newPage = new Page();
    const pagesMap = new Map<string, IPage>();
    pagesMap.set(newPage.id, newPage);

    // const newElements = new Elements();
    // const elementsMap = new Map<string, IElements>();
    // elementsMap.set(newElements.id, newElements);
    //
    // const newElementMap = new Map<string, IElementsMap>();
    // newElementMap.set(newPage.id, elementsMap);

    this.id = id ? id : UUID.UUID();
    this.name = name ? name : '';
    this.pages = pages ? pages : new Map<string, IPage>(pagesMap);
    // this.elements = elements ? elements :  new Map<string, IElementsMap>(newElementMap);
    this.description = description ? description : '';
  }
}
