import {arrayToMap, updateElementPositionInMap} from '../utils';
import {IOptionAnswers, IOptionAnswersMap, OptionAnswers} from '../../models/option-answers.model';
import {IPageFlow} from '../../models/page-flow.model';
import {moveItemInArray} from '@angular/cdk/drag-drop';

export function addOptionAnswer(elementId: string, optionAnswers: IOptionAnswersMap): IOptionAnswersMap {
  const newOptionAnswers = new OptionAnswers(elementId);

  optionAnswers.set(newOptionAnswers.id, newOptionAnswers);
  updateElementPositionInMap(optionAnswers);

  return new Map<string, IOptionAnswers>(optionAnswers);
}

export function createNewOptionAnswersMap(elementId: string): IOptionAnswersMap {
  const newOptionAnswers: IOptionAnswers = new OptionAnswers(elementId);
  const newOptionAnswersMap: IOptionAnswersMap = new Map<string, IOptionAnswers>().set(newOptionAnswers.id, newOptionAnswers);

  return new Map<string, IOptionAnswers>(newOptionAnswersMap);
}

export function removeOptionAnswer(optionAnswersId: string, optionAnswers: IOptionAnswersMap): IOptionAnswersMap {
  optionAnswers.delete(optionAnswersId);
  updateElementPositionInMap(optionAnswers);

  return new Map<string, IOptionAnswers>(optionAnswers);
}

export function addOptionAnswerValue(optionAnswersId: string, value: string, optionAnswers: IOptionAnswersMap): IOptionAnswersMap {
  const currentOptionAnswer: IOptionAnswers = optionAnswers.get(optionAnswersId);

  currentOptionAnswer.value = value;

  return new Map<string, IOptionAnswers>(optionAnswers);
}

export function updateOptionAnswerPageFlow(
  optionAnswersId: string, pageFlow: IPageFlow, optionAnswers: IOptionAnswersMap
): IOptionAnswersMap {
  const currentOptionAnswer: IOptionAnswers = optionAnswers.get(optionAnswersId);

  currentOptionAnswer.pageFlow = pageFlow;

  return new Map<string, IOptionAnswers>(optionAnswers);
}

export function dragOptionAnswer(startIndex: number, endIndex: number, optionAnswers: IOptionAnswersMap): IOptionAnswersMap {
  const newOptionAnswersMap = dragItemInArray(optionAnswers, startIndex, endIndex);

  updateElementPositionInMap(newOptionAnswersMap);

  return new Map<string, IOptionAnswers>(newOptionAnswersMap);
}

export function toggleIsActiveOptionAnswerValue(isSaved: boolean, optionAnswers: IOptionAnswersMap): IOptionAnswersMap {
  optionAnswers.forEach(value => {
    value.isSaved = isSaved;
  });

  return new Map<string, IOptionAnswers>(optionAnswers);
}

export const dragItemInArray = (
  map: Map<string, IOptionAnswers>, startIndex: number, endIndex: number
): Map<string, IOptionAnswers> => {
  const array = Array.from(map);
  moveItemInArray(array, startIndex, endIndex);
  return arrayToMap(array);
};

