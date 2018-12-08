import {IPage, IPageMap, Page} from '../../models/page.model';
import {getLastValueInMap, moveItemInMap, updateElementPositionInMap} from '../utils';
import {IPageFlow} from '../../models/page-flow.model';
import * as elements from '../elements/elements.actions';

export function createNextPage(pages: IPageMap, surveyId: string, pageId: string): IPageMap {
  const newPage: IPage = new Page(pageId, surveyId);

  if (pages.size > 1) {
    const lastPage = getLastValueInMap(pages);
    newPage.orderNo = lastPage.orderNo + 1;
  }

  pages.set(newPage.id, newPage);

  return new Map<string, IPage>(pages);
}

export function insertPage(pages: IPageMap, previousPageId: string, surveyId: string, pageId: string): IPageMap {
  const newPage: IPage = new Page(pageId, surveyId);
  const pagesMap = new Map<string, IPage>();

  pages.forEach((value, key) => {
    if (key === previousPageId) {
      pagesMap.set(key, value);
      pagesMap.set(newPage.id, newPage);
    } else {
      pagesMap.set(key, value);
    }
  });

  updateElementPositionInMap(pagesMap);

  return new Map<string, IPage>(pagesMap);
}

export function movePageUp(pages: IPageMap, pageId: string): IPageMap {
  const currentPage = pages.get(pageId);
  const index = currentPage.orderNo - 2;

  pages.delete(pageId);
  const pagesMap = moveItemInMap(pages, index, currentPage);
  updateElementPositionInMap(pagesMap);

  return new Map<string, IPage>(pagesMap);
}

export function movePageDown(pages: IPageMap, pageId: string): IPageMap {
  const currentPage = pages.get(pageId);
  const index = currentPage.orderNo;

  pages.delete(pageId);
  const pagesMap = moveItemInMap(pages, index, currentPage);
  updateElementPositionInMap(pagesMap);

  return new Map<string, IPage>(pagesMap);
}

export function removePage(pages: IPageMap, pageId: string): IPageMap {
  pages.delete(pageId);
  updateElementPositionInMap(pages);
  // TODO remove element
  return new Map<string, IPage>(pages);
}

export function updatePageName(pages: IPageMap, pageId: string, name: string): IPageMap {
  const currentPage: IPage = pages.get(pageId);

  currentPage.name = name;

  return new Map<string, IPage>(pages);
}

export function updatePageDescription(pages: IPageMap, pageId: string, description: string): IPageMap {
  const currentPage: IPage = pages.get(pageId);

  currentPage.description = description;

  return new Map<string, IPage>(pages);
}

export function updatePagePageFlow(pages: IPageMap, pageId: string, pageFlow: IPageFlow): IPageMap {
  const currentPage: IPage = pages.get(pageId);

  currentPage.pageFlow = pageFlow;

  return new Map<string, IPage>(pages);
}
