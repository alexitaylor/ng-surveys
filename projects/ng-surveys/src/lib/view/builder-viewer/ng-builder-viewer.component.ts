import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import { Subscription} from 'rxjs';
import * as utils from '../../store/utils';

import {NgSurveyState} from '../../store/ng-survey.state';
import {resetNgSurveyState} from '../../store/utils';
import {IPageMap, INgSurvey, IBuilderOptions} from '../../models/index';
import {NgSurveyStore} from '../../store/ng-survey.store';
import {SurveyReducer} from '../../store/survey/survey.reducer';
import {SurveyActionTypes} from '../../store/survey/survey.actions';
import {PagesActionTypes} from '../../store/pages/pages.actions';
import {PagesReducer} from '../../store/pages/pages.reducer';
import {BuilderOptionsReducer} from '../../store/builder-options/builder-options.reducer';
import {BuilderOptionsActionTypes} from '../../store/builder-options/builder-options.actions';

@Component({
  selector: 'ngs-builder-viewer',
  templateUrl: './ng-builder-viewer.component.html',
  styleUrls: ['./ng-builder-viewer.component.scss']
})
export class NgBuilderViewerComponent implements OnInit, OnDestroy {
  private _options: IBuilderOptions;
  @Input() set options(value: IBuilderOptions) {
    this._options = value;
    this.handleBuilderOptionsChange(this._options);
  }
  get options(): IBuilderOptions {
    return this._options;
  }

  surveySub: Subscription;
  survey: INgSurvey;

  ngSurveyStateSub: Subscription;
  ngSurveyState: NgSurveyState;

  pagesSub: Subscription;
  pages: IPageMap;
  isLoading = false;

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private _surveyReducer: SurveyReducer,
    private _pagesReducer: PagesReducer,
    private _builderOptionsReducer: BuilderOptionsReducer,
  ) {
    this.surveySub = this._ngSurveyStore.survey.subscribe(res => {
      this.survey = res;
    });

    this.ngSurveyStateSub = this._ngSurveyStore.ngSurveyState.subscribe(res => {
      this.ngSurveyState = res;
    });

    this.pagesSub = this._ngSurveyStore.pages.subscribe(pagesRes => {
      this.pages = pagesRes;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.surveySub.unsubscribe();
    this.pagesSub.unsubscribe();
    this.ngSurveyStateSub.unsubscribe();
  }

  handleBuilderOptionsChange(builderOptions: IBuilderOptions) {
    this._builderOptionsReducer.builderOptionsReducer({
      type: BuilderOptionsActionTypes.UPDATE_BUILDER_OPTIONS_ACTION,
      payload: { builderOptions }
    });
  }

  addPage() {
    const pageId = utils.UUID();
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.ADD_PAGE_ACTION,
      payload: { surveyId: this.survey.id, pageId },
    });
  }

  reset() {
    const ngSurveyState: NgSurveyState = resetNgSurveyState();
    ngSurveyState.survey.isLoading = true;
    this._surveyReducer.surveyReducer({
      type: SurveyActionTypes.RESET_SURVEY_STATE_ACTION,
      payload: { ngSurveyState },
    });
  }

  importSurvey(cb) {
    cb().subscribe(ngSurveyState => {
      ngSurveyState.survey.isLoading = true;
      this._surveyReducer.surveyReducer({
        type: SurveyActionTypes.IMPORT_SURVEY_STATE_ACTION,
        payload: { ngSurveyState },
      });
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
