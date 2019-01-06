import { moveItemInArray } from '@angular/cdk/drag-drop';
import * as utils from '../store/utils';
import {NgSurvey} from '../models/ng-survey.model';
import {NgSurveyState} from './ng-survey.state';
import {
  IOptionAnswers,
  IOptionAnswersMap,
  IPage,
  IElements,
  IElementsMap,
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

export const resetNgSurveyState = (): NgSurveyState => {
  // Init Survey
  const angularSurvey = new NgSurvey();

  // Init Pages
  const pageId = utils.UUID();
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

export function isNil(obj: any): boolean {
  return obj === undefined || obj === null;
}

export const getLastItemInMap = map => Array.from(map)[map.size - 1];
export const getLastKeyInMap = map => Array.from(map)[map.size - 1][0];
export const getElementByKeyInMap = (map, key) => map.get(key);

export const UUID = (): string => {
  if (
    typeof (window) !== 'undefined'
    && typeof (window.crypto) !== 'undefined'
    && typeof (window.crypto.getRandomValues) !== 'undefined'
  ) {
    // If we have a cryptographically secure PRNG, use that
    // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
    const buf: Uint16Array = new Uint16Array(8);
    window.crypto.getRandomValues(buf);
    return (
      pad4(buf[0]) + pad4(buf[1])
      + '-' + pad4(buf[2])
      + '-' + pad4(buf[3])
      + '-' + pad4(buf[4])
      + '-' + pad4(buf[5])
      + pad4(buf[6])
      + pad4(buf[7]));
  } else {
    // Otherwise, just use Math.random
    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    // https://stackoverflow.com/questions/11605068/why-does-jshint-argue-against-bitwise-operators-how-should-i-express-this-code
    return random4() + random4() + '-' + random4() + '-' + random4() + '-' +
      random4() + '-' + random4() + random4() + random4();
  }
};

export const pad4 = (num: number): string => {
  let ret: string = num.toString(16);
  while (ret.length < 4) {
    ret = '0' + ret;
  }
  return ret;
};

export const random4 = (): string => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const mapTag = '[object Map]';
const dateTag = '[object Date]';

export const deepCopy = (value) => {
  let output, v;
  const tag = getTag(value);
  if (tag === arrayTag || tag === objectTag) {
    output = Array.isArray(value) ? [] : {};
    for (const key of Object.keys(value)) {
      v = value[key];
      output[key] = (typeof v === 'object') ? deepCopy(v) : v;
    }
  } else if (tag === mapTag) {
    output = new Map();
    value.forEach((subValue, key) => {
      output.set(key, deepCopy(subValue));
    });
    return output;
  } else if (tag === dateTag) {
    return new Date(value.getTime());
  }

  return output;
};

function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
}
