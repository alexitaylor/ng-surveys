import {IPage, IPageMap, Page} from '../models/page.model';
import {Elements, IElements, IElementsMap} from '../models/elements.model';
import {IQuestion} from '../models/question.model';
import {IOptionAnswers, IOptionAnswersMap, OptionAnswers} from '../models/option-answers.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import {UUID} from 'angular2-uuid';
import {NgxSurvey} from '../models/ngx-survey.model';
import {NgxSurveyState} from './ngx-survey.state';

export const getLastValueInMap = map => Array.from(map)[map.size - 1][1];

export const arrayToMap = (array) => array.reduce((map, arrayEl) => map.set(arrayEl[0], arrayEl[1]), new Map<string, IPage | IElements>());

export const moveItemInMap = (map: Map<string, IPage | IElements>, index: number, item: IPage | IElements) => {
  let array: Array<[string, IPage | IElements]> = Array.from(map);

  if (index > array.length - 1) {
    array.push([item.id, item]);
  } else {
    array = array.reduce((newArray: Array<[string, IPage | IElements]>, el: [string, IPage | IElements], idx: number) => {
      if (idx === index) {
        newArray.push([item.id, item]);
        newArray.push(el);
      } else {
        newArray.push(el);
      }
      return newArray;
    }, []);
  }

  return arrayToMap(array);
};

export const dragItemInArray = (
  map: Map<string, any>, startIndex: number, endIndex: number
): Map<string, any> => {
  const array = Array.from(map);
  moveItemInArray(array, startIndex, endIndex);
  return arrayToMap(array);
};

export const updateElementPositionInMap = (map) => Array.from(map).reduce(
  (acc: number, el: string | IPage | IQuestion | IOptionAnswers[]) => el[1].orderNo = acc + 1, 0);

export const resetNgxSurveyState = (): NgxSurveyState => {
  // Init Survey
  const angularSurvey = new NgxSurvey();

// Init Pages
  const pageId = UUID.UUID();
  const page = new Page(pageId, angularSurvey.id);
  const pageMap = new Map<string, IPage>().set(page.id, page);

// Init Elements
  const element = new Elements(page.id);
  const elementMap = new Map<string, IElements>().set(element.id, element);
  const elementsMap = new Map<string, IElementsMap>().set(page.id, elementMap);

// Init Option Answers
  const optionAnswerMap = new Map<string, IOptionAnswers>();
  const optionAnswersMap = new Map<string, IOptionAnswersMap>().set(element.id, optionAnswerMap);

  return {
    survey: angularSurvey,
    pages: pageMap,
    elements: elementsMap,
    optionAnswers: optionAnswersMap,
  };
};

export function isEmpty(obj: any): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function isNil(obj: any): boolean {
  return obj === undefined || obj === null;
}

export const getLastItemInMap = map => Array.from(map)[map.size - 1];
export const getLastKeyInMap = map => Array.from(map)[map.size - 1][0];
export const getElementByKeyInMap = (map, key) => map.get(key);
