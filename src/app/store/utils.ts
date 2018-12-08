import {IPage} from '../models/page.model';
import {IElements} from '../models/elements.model';
import {IQuestion} from '../models/question.model';
import {IOptionAnswers, IOptionAnswersMap, OptionAnswers} from '../models/option-answers.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';

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
  map: Map<string, IPage | IElements | IOptionAnswers>, startIndex: number, endIndex: number
): Map<string, IPage | IElements | IOptionAnswers> => {
  const array = Array.from(map);
  moveItemInArray(array, startIndex, endIndex);
  return arrayToMap(array);
};

export const updateElementPositionInMap = (map) => Array.from(map).reduce(
  (acc: number, el: string | IPage | IQuestion | IOptionAnswers[]) => el[1].orderNo = acc + 1, 0);

export const getLastItemInMap = map => Array.from(map)[map.size - 1];
export const getLastKeyInMap = map => Array.from(map)[map.size - 1][0];
export const getElementByKeyInMap = (map, key) => map.get(key);
