import {IPage, IPageMap, Page} from '../models/page.model';
import {Elements, IElements} from '../models/elements.model';
import {IQuestion} from '../models/question.model';
import {IOptionAnswers, IOptionAnswersMap, OptionAnswers} from '../models/option-answers.model';
import {IPageFlow} from '../models/page-flow.model';

export function createNextPage(pages: IPageMap): IPageMap {
  const newPage: IPage = new Page();
  const lastPage = getLastValueInMap(pages);

  newPage.orderNo = lastPage.orderNo + 1;
  pages.set(newPage.id, newPage);

  return new Map<string, IPage>(pages);
}

export function removePage(pages: IPageMap, pageId: string): IPageMap {
  pages.delete(pageId);
  updateElementPositionInMap(pages);

  return new Map<string, IPage>(pages);
}

export function createNextElement(pages: IPageMap, id: string): IPageMap {
  const currentPage: IPage = getElementByKeyInMap(pages, id);
  const newElement: IElements = new Elements();

  newElement.pageId = currentPage.id;
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

  currentQuestion.elementId = elementId;
  currentQuestion.text = text;

  return new Map<string, IPage>(pages);
}

export function addQuestionType(pages: IPageMap, pageId: string, elementId: string, type: string): IPageMap {
  const currentQuestion: IQuestion = getCurrentQuestion(pages, pageId, elementId);

  currentQuestion.type = type;

  if (type === 'radio' || type === 'checkboxes' || type === 'select') {
    currentQuestion.optionAnswers = createOptionAnswers();
  }

  return new Map<string, IPage>(pages);
}

export function updateQuestionPageFlowModifier(pages: IPageMap, pageId: string, elementId: string, pageFlowModifier: boolean): IPageMap {
  const currentQuestion: IQuestion = getCurrentQuestion(pages, pageId, elementId);

  currentQuestion.pageFlowModifier = pageFlowModifier;

  return new Map<string, IPage>(pages);
}

export function addOptionAnswer(pages: IPageMap, pageId: string, elementId: string): IPageMap {
  const currentQuestion: IQuestion = getCurrentQuestion(pages, pageId, elementId);
  const newOptionAnswers = new OptionAnswers();

  currentQuestion.optionAnswers.set(newOptionAnswers.id, newOptionAnswers);
  updateElementPositionInMap(currentQuestion.optionAnswers);

  return new Map<string, IPage>(pages);
}

export function removeOptionAnswer(pages: IPageMap, pageId: string, elementId: string, optionAnswersId: string): IPageMap {
  const currentQuestion: IQuestion = getCurrentQuestion(pages, pageId, elementId);

  currentQuestion.optionAnswers.delete(optionAnswersId);
  updateElementPositionInMap(currentQuestion.optionAnswers);

  return new Map<string, IPage>(pages);
}

export function addOptionAnswerValue(pages: IPageMap, pageId: string, elementId: string, optionAnswersId: string, value: string): IPageMap {
  const currentQuestion: IQuestion = getCurrentQuestion(pages, pageId, elementId);
  const currentOptionAnswer: IOptionAnswers = currentQuestion.optionAnswers.get(optionAnswersId);

  currentOptionAnswer.value = value;

  return new Map<string, IPage>(pages);
}

export function updateOptionAnswerPageFlow(
  pages: IPageMap, pageId: string, elementId: string, optionAnswersId: string, pageFlow: IPageFlow
): IPageMap {
  const currentQuestion: IQuestion = getCurrentQuestion(pages, pageId, elementId);
  const currentOptionAnswer: IOptionAnswers = currentQuestion.optionAnswers.get(optionAnswersId);

  currentOptionAnswer.pageFlow = pageFlow;

  return new Map<string, IPage>(pages);
}

export const getLastValueInMap = map => Array.from(map)[map.size - 1][1];
export const getElementByKeyInMap = (map, key) => map.get(key);

export const updateElementPositionInMap = (map) => Array.from(map).reduce(
  (acc: number, el: string | IPage | IQuestion | IOptionAnswers[]) => el[1].orderNo = acc + 1, 0);

export const getCurrentQuestion = (pages, pageId, elementId) => getElementByKeyInMap(
  getElementByKeyInMap(pages, pageId).elements, elementId).question;

export const createOptionAnswers = (): IOptionAnswersMap => {
  const newOptionAnswers = new OptionAnswers();
  const optionAnswersMap = new Map<string, IOptionAnswers>();
  optionAnswersMap.set(newOptionAnswers.id, newOptionAnswers);
  return new Map<string, IOptionAnswers>(optionAnswersMap);
};

export const getLastItemInMap = map => Array.from(map)[map.size - 1];
export const getLastKeyInMap = map => Array.from(map)[map.size - 1][0];
