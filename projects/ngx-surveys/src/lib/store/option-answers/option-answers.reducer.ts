import * as optionAnswers from './option-answers.actions';
import * as optionAnswersUtil from './option-answers-util';
import * as _ from 'lodash';
import {appInitialState} from '../ngx-survey.state';
import {IOptionAnswers, IOptionAnswersMap, IOptionAnswersMaps} from '../../models/option-answers.model';

export function reducer(state = appInitialState.optionAnswers, action: optionAnswers.Actions): IOptionAnswersMaps {

  switch (action.type) {

    case optionAnswers.OptionAnswersActionTypes.ADD_OPTION_ANSWERS_ACTION: {
      const { elementId } = action.payload;
      const prevOptionAnswers: IOptionAnswersMap = state.get(elementId);
      let newOptionAnswers: IOptionAnswersMap;

      if (!prevOptionAnswers) {
        newOptionAnswers = optionAnswersUtil.createNewOptionAnswersMap(elementId);
      } else {
        newOptionAnswers = optionAnswersUtil.addOptionAnswer(elementId, prevOptionAnswers);
      }

      state.set(elementId, newOptionAnswers);

      return _.cloneDeep(state);
    }

    case optionAnswers.OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_ACTION: {
      const { elementId, optionAnswerId } = action.payload;
      const prevOptionAnswers: IOptionAnswersMap = state.get(elementId);
      const newOptionAnswers: IOptionAnswersMap = optionAnswersUtil.removeOptionAnswer(optionAnswerId, prevOptionAnswers);

      state.set(elementId, newOptionAnswers);

      return _.cloneDeep(state);
    }

    case optionAnswers.OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_MAP_ACTION: {
      const { elementId } = action.payload;
      state.delete(elementId);
      return _.cloneDeep(state);
    }

    case optionAnswers.OptionAnswersActionTypes.REMOVE_OPTION_ANSWERS_MAPS_ACTION: {
      const { elementIds } = action.payload;
      elementIds.forEach(id => state.delete(id));
      return _.cloneDeep(state);
    }

    case optionAnswers.OptionAnswersActionTypes.ADD_OPTION_ANSWERS_VALUE_ACTION: {
      const { elementId, optionAnswerId, value } = action.payload;
      const prevOptionAnswers: IOptionAnswersMap = state.get(elementId);
      const newOptionAnswers: IOptionAnswersMap = optionAnswersUtil.addOptionAnswerValue(
        optionAnswerId, value, prevOptionAnswers
      );

      state.set(elementId, newOptionAnswers);

      return _.cloneDeep(state);
    }

    case optionAnswers.OptionAnswersActionTypes.UPDATE_OPTION_ANSWERS_PAGE_FLOW: {
      const { elementId, optionAnswerId, pageFlow } = action.payload;
      const prevOptionAnswers: IOptionAnswersMap = state.get(elementId);
      const newOptionAnswers: IOptionAnswersMap = optionAnswersUtil.updateOptionAnswerPageFlow(optionAnswerId, pageFlow, prevOptionAnswers);

      state.set(elementId, newOptionAnswers);

      return _.cloneDeep(state);
    }

    case optionAnswers.OptionAnswersActionTypes.DRAG_OPTION_ANSWERS_ACTION: {
      const { elementId, startIndex, endIndex } = action.payload;
      const prevOptionAnswers: IOptionAnswersMap = state.get(elementId);
      const newOptionAnswers: IOptionAnswersMap = optionAnswersUtil.dragOptionAnswer(startIndex, endIndex, prevOptionAnswers);

      state.set(elementId, newOptionAnswers);

      return _.cloneDeep(state);
    }

    case optionAnswers.OptionAnswersActionTypes.TOGGLE_IS_ACTIVE_OPTION_ANSWERS_ACTION: {
      const { elementId, isSaved } = action.payload;
      const prevOptionAnswers: IOptionAnswersMap = state.get(elementId);

      if (prevOptionAnswers) {
        const newOptionAnswers: IOptionAnswersMap = optionAnswersUtil.toggleIsActiveOptionAnswerValue(isSaved, prevOptionAnswers);
        state.set(elementId, newOptionAnswers);
      }

      return _.cloneDeep(state);
    }

    case optionAnswers.OptionAnswersActionTypes.RESET_OPTION_ANSWERS_STATE: {
      const { ngxSurveyState } = action.payload;
      return Object.assign(ngxSurveyState.optionAnswers);
    }

<<<<<<< Updated upstream
=======
    case optionAnswers.OptionAnswersActionTypes.IMPORT_OPTION_ANSWERS_STATE: {
      const { ngxSurveyState } = action.payload;
      return Object.assign(ngxSurveyState.optionAnswers);
    }

    case optionAnswers.OptionAnswersActionTypes.IMPORT_OPTION_ANSWERS: {
      const { newOptionAnswers, elementId } = action.payload;

      state.set(elementId, newOptionAnswers);

      return _.cloneDeep(state);
    }

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    default: {
      return state;
    }
  }
}
