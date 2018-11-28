import {IPage, IPageMap, Page} from '../models/page.model';
import {Elements, IElements} from '../models/elements.model';
import {IQuestion} from '../models/question.model';

export function createNextPage(pages: IPageMap): IPageMap {
  const newPage: IPage = new Page();
  const lastPage = getLastValueInMap(pages);

  newPage.number = lastPage.number + 1;
  pages.set(newPage.id, newPage);

  return new Map<string, IPage>(pages);
}

export function removePage(pages: IPageMap, id: string): IPageMap {
  pages.delete(id);
  updateElementPositionInMap(pages);

  return new Map<string, IPage>(pages);
}

export function createNextElement(pages: IPageMap, id: string): IPageMap {
  const currentPage: IPage = getElementByKeyInMap(pages, id);
  const newElement: IElements = new Elements();

  currentPage.elements.set(newElement.id, newElement);
  updateElementPositionInMap(currentPage.elements);

  return new Map<string, IPage>(pages);
}

export function removeElement(pages: IPageMap, pageId: string, elementId: string): IPageMap {
  const currentPage: IPage = getElementByKeyInMap(pages, pageId);

  currentPage.elements.delete(elementId);
  updateElementPositionInMap(currentPage.elements);

  return new Map<string, IPage>(pages);
}

export function addQuestionText(pages: IPageMap, pageId: string, elementId: string, text: string): IPageMap {
  const currentQuestion: IQuestion = getCurrentQuestion(pages, pageId, elementId);

  currentQuestion.text = text;

  return new Map<string, IPage>(pages);
}

export function addQuestionType(pages: IPageMap, pageId: string, elementId: string, type: string): IPageMap {
  const currentQuestion: IQuestion = getCurrentQuestion(pages, pageId, elementId);

  currentQuestion.type = type;

  return new Map<string, IPage>(pages);
}

export const getLastValueInMap = map => Array.from(map)[map.size - 1][1];
export const getElementByKeyInMap = (map, key) => map.get(key);
export const updateElementPositionInMap = (map) => Array.from(map).reduce((acc: number, el: any[]) => el[1].number = acc + 1, 0);
export const getCurrentQuestion = (pages, pageId, elementId) => getElementByKeyInMap(
  getElementByKeyInMap(pages, pageId).elements, elementId)
  .question;

export const getLastItemInMap = map => Array.from(map)[map.size - 1];
export const getLastKeyInMap = map => Array.from(map)[map.size - 1][0];
