import { moveItemInArray } from '@angular/cdk/drag-drop';
import {UUID} from 'angular2-uuid';
import {NgxSurvey} from '../models/ngx-survey.model';
import {NgxSurveyState} from './ngx-survey.state';
import {
  IOptionAnswers,
  IOptionAnswersMap,
  IOptionAnswersMaps,
  IPage,
  IPageMap,
  IElements,
  IElementsMap,
  IElementsMaps,
  IQuestion,
  BuilderOptionsModel,
  Page,
  Elements,
} from '../models';

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
  (acc: number, el: string | IPage | IQuestion | IOptionAnswers[] | IElements) => el[1].orderNo = acc + 1, 0);

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
    builderOptions: new BuilderOptionsModel(),
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

export const deserializeUtils = {
  deserializePages(json: any): IPageMap | any {
    const pagesMap = new Map<string, IPage>();

    if (Array.isArray(json)) {
      json.forEach(el => {
        pagesMap.set(el[0], el[1]);
      });

      return pagesMap;
    }

    return json;
  },

  deserializeElements(json: any): IElementsMaps | any {
    const elementsMap = new Map<string, IElementsMap>();

    if (Array.isArray(json)) {
      json.forEach(outer => {
        const elementMap = new Map<string, IElements>();
        outer[1].forEach(inner => {
          elementMap.set(inner[0], inner[1]);
        });
        elementsMap.set(outer[0], elementMap);
      });

      return elementsMap;
    }

    return json;
  },

  deserializeOptionAnswersMaps(json: any): IOptionAnswersMaps | any {
    const optionAnswersMap = new Map<string, IOptionAnswersMap>();

    if (Array.isArray(json)) {
      json.forEach(outer => {
        const optionAnswerMap = new Map<string, IOptionAnswers>();
        outer[1].forEach(inner => {
          optionAnswerMap.set(inner[0], inner[1]);
        });
        optionAnswersMap.set(outer[0], optionAnswerMap);
      });

      return optionAnswersMap;
    }

    return json;
  },

  deserializeOptionAnswersMap(json: any): IOptionAnswersMaps | any {
    const optionAnswerMap = new Map<string, IOptionAnswers>();

    if (Array.isArray(json)) {
      json.forEach(el => {
        optionAnswerMap.set(el[0], el[1]);
      });

      return optionAnswerMap;
    }

    return json;
  },
}

export function isNil(obj: any): boolean {
  return obj === undefined || obj === null;
}

export const getLastItemInMap = map => Array.from(map)[map.size - 1];
export const getLastKeyInMap = map => Array.from(map)[map.size - 1][0];
export const getElementByKeyInMap = (map, key) => map.get(key);
