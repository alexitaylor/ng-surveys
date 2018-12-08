import {Elements, IElements, IElementsMap} from '../../models/elements.model';
import {IQuestion} from '../../models/question.model';
import {
  dragItemInArray, moveItemInMap,
  updateElementPositionInMap
} from '../utils';

export function createNextElement(pageId: string, elements: IElementsMap): IElementsMap {
  const newElement: IElements = new Elements(pageId);

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

export function removeQuestionMinAndMax(elementId: string, elements: IElementsMap): IElementsMap {
  const currentElement: IElements = elements.get(elementId);

  if (currentElement) {
    const currentQuestion: IQuestion = currentElement.question;
    currentQuestion.min = null;
    currentQuestion.max = null;
    currentElement.question = currentQuestion;
  }

  return new Map<string, IElements>(elements);
}

export function updateQuestionPageFlowModifier(elementId: string, pageFlowModifier: boolean, elements: IElementsMap): IElementsMap {
  const currentQuestion: IQuestion = elements.get(elementId).question;

  currentQuestion.pageFlowModifier = pageFlowModifier;

  return new Map<string, IElements>(elements);
}
