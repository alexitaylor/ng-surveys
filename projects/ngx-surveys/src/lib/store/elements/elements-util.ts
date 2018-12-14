import {Elements, IElements, IElementsMap} from '../../models/elements.model';
import {IQuestion} from '../../models/question.model';
import {
  dragItemInArray, moveItemInMap,
  updateElementPositionInMap
} from '../utils';

export function createNextElement(pageId: string, elements: IElementsMap): IElementsMap {
  const newElement: IElements = new Elements(pageId);

  handleElementShowPageFlowToggle(elements, newElement);
  elements.set(newElement.id, newElement);
  updateElementPositionInMap(elements);

  return new Map<string, IElements>(elements);
}

export function createNewElementMap(pageId: string): IElementsMap {
  const newElement: IElements = new Elements(pageId);
  const newElementMap: IElementsMap = new Map<string, IElements>().set(newElement.id, newElement);

  return new Map<string, IElements>(newElementMap);
}

export function removeElement(elementId: string, elements: IElementsMap): IElementsMap {
  elements.delete(elementId);
  updateElementPositionInMap(elements);
  handleElementsShowPageFlowToggle(elements);

  return new Map<string, IElements>(elements);
}

export function moveElementUp(elementId: string, elements: IElementsMap): IElementsMap {
  const currentElement: IElements = elements.get(elementId);
  const index = currentElement.orderNo - 2;

  elements.delete(elementId);
  const newElementsMap: IElementsMap = moveItemInMap(elements, index, currentElement);

  updateElementPositionInMap(newElementsMap);

  return new Map<string, IElements>(newElementsMap);
}

export function moveElementDown(elementId: string, elements: IElementsMap): IElementsMap {
  const currentElement: IElements = elements.get(elementId);
  const index = currentElement.orderNo;

  elements.delete(elementId);
  const newElementsMap: IElementsMap = moveItemInMap(elements, index, currentElement);
  updateElementPositionInMap(newElementsMap);

  return new Map<string, IElements>(newElementsMap);
}

export function dragElement(startIndex: number, endIndex: number, elements: IElementsMap): IElementsMap {
  const newElementsMap: IElementsMap = dragItemInArray(elements, startIndex, endIndex);
  updateElementPositionInMap(newElementsMap);

  return new Map<string, IElements>(newElementsMap);
}

export function addQuestionText(elementId: string, text: string, elements: IElementsMap): IElementsMap {
  const currentQuestion: IQuestion = elements.get(elementId).question;

  currentQuestion.text = text;

  return new Map<string, IElements>(elements);
}

export function addQuestionType(elementId: string, type: string, elements: IElementsMap): IElementsMap {
  const currentQuestion: IQuestion = elements.get(elementId).question;

  currentQuestion.type = type;

  return new Map<string, IElements>(elements);
}

export function updateQuestionMin(elementId: string, min: number, elements: IElementsMap): IElementsMap {
  const currentQuestion: IQuestion = elements.get(elementId).question;

  currentQuestion.min = min;

  return new Map<string, IElements>(elements);
}

export function updateQuestionMax(elementId: string, max: number, elements: IElementsMap): IElementsMap {
  const currentQuestion: IQuestion = elements.get(elementId).question;

  currentQuestion.max = max;

  return new Map<string, IElements>(elements);
}

export function removeQuestionValues(elementId: string, elements: IElementsMap): IElementsMap {
  const currentElement: IElements = elements.get(elementId);

  if (currentElement) {
    const currentQuestion: IQuestion = currentElement.question;
    currentQuestion.min = null;
    currentQuestion.max = null;
    currentQuestion.answer = '';
    currentQuestion.text = '';
    currentElement.question = currentQuestion;
  }

  return new Map<string, IElements>(elements);
}

export function updateQuestionPageFlowModifier(elementId: string, pageFlowModifier: boolean, elements: IElementsMap): IElementsMap {
  const currentQuestion: IQuestion = elements.get(elementId).question;

  currentQuestion.pageFlowModifier = pageFlowModifier;
  updateShowPageFlowToggle(elements, elementId);

  return new Map<string, IElements>(elements);
}

export function toggleElementIsSaved(elementId: string, isSaved: boolean, elements: IElementsMap): IElementsMap {
  const element: IElements = elements.get(elementId);

  element.isSaved = isSaved;

  return new Map<string, IElements>(elements);
}

export function updateQuestionAnswer(elementId: string, answer: string | number, elements: IElementsMap): IElementsMap {
  const currentQuestion: IQuestion = elements.get(elementId).question;

  currentQuestion.answer = answer;

  return new Map<string, IElements>(elements);
}

export function importElement(element: IElements, pageId: string, elements: IElementsMap, currentElement: IElements) {
  elements.delete(currentElement.id);
  element.pageId = pageId;
  elements.set(element.id, element);
  updateElementPositionInMap(elements);
  handleElementsShowPageFlowToggle(elements);

  return new Map<string, IElements>(elements);
}

export const updateShowPageFlowToggle = (elements: IElementsMap, elementId: string): void =>
  elements.forEach((value: IElements, key: string) => value.showPageFlowToggle = key === elementId);

export const handleElementShowPageFlowToggle = (elements: IElementsMap, newElement: IElements) =>
  newElement.showPageFlowToggle = Array.from(elements).reduce((show, el) => show && el[1].showPageFlowToggle, true);

export const handleElementsShowPageFlowToggle = (elements: IElementsMap): void => {
  const changeElementsShowPageFlowToggle = Array.from(elements).reduce((show, el) => show && !el[1].showPageFlowToggle, true);
  if (changeElementsShowPageFlowToggle) {
    elements.forEach((value: IElements) => value.showPageFlowToggle = true);
  }
};
