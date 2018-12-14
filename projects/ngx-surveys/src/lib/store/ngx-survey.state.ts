import {INgxSurvey} from '../models/ngx-survey.model';
import {IElementsMaps} from '../models/elements.model';
import {IPageMap} from '../models/page.model';
import {IOptionAnswersMaps} from '../models/option-answers.model';
import {resetNgxSurveyState} from './utils';
import {IBuilderOptions} from '../models';

export interface NgxSurveyState {
  survey: INgxSurvey;
  pages: IPageMap;
  elements: IElementsMaps;
  optionAnswers: IOptionAnswersMaps;
  builderOptions: IBuilderOptions;
}

export const appInitialState = resetNgxSurveyState();
