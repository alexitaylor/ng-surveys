import {INgSurvey} from '../models/ng-survey.model';
import {IElementsMaps} from '../models/elements.model';
import {IPageMap} from '../models/page.model';
import {IOptionAnswersMaps} from '../models/option-answers.model';
import {resetNgSurveyState} from './utils';
import {IBuilderOptions} from '../models';

export interface NgSurveyState {
  survey: INgSurvey;
  pages: IPageMap;
  elements: IElementsMaps;
  optionAnswers: IOptionAnswersMaps;
  builderOptions: IBuilderOptions;
}

export const appInitialState = resetNgSurveyState();
