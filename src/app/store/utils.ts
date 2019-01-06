// @ts-ignore
import {
  IOptionAnswers,
  IOptionAnswersMap,
  IOptionAnswersMaps,
  IPage,
  IPageMap,
  IElements,
  IElementsMap,
  IElementsMaps
} from 'ng-surveys';

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
};
