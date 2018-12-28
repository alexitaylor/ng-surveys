import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {UUID} from 'angular2-uuid';

import {NgxSurveyState} from '../../store/ngx-survey.state';
import {resetNgxSurveyState} from '../../store/utils';
import {IPageMap, INgxSurvey, IBuilderOptions} from '../../models/index';
import {NgxSurveyStore} from '../../store/ngx-survey.store';
import {SurveyReducer} from '../../store/survey/survey.reducer';
import {SurveyActionTypes} from '../../store/survey/survey.actions';
import {PagesActionTypes} from '../../store/pages/pages.actions';
import {PagesReducer} from '../../store/pages/pages.reducer';

@Component({
  selector: 'ngxs-builder-viewer',
  templateUrl: './ngx-builder-viewer.component.html',
  styleUrls: ['./ngx-builder-viewer.component.scss']
})
export class NgxBuilderViewerComponent implements OnInit, OnDestroy {
  private _options: IBuilderOptions;
  @Input() set options(value: IBuilderOptions) {
    this._options = value;
    this.handleBuilderOptionsChange(this._options);
  }
  get options(): IBuilderOptions {
    return this._options;
  }

  surveySub: Subscription;
  survey: INgxSurvey;

  ngxSurveyStateSub: Subscription;
  ngxSurveyState: NgxSurveyState;

  pagesSub: Subscription;
  pages: IPageMap;
  isLoading = false;

  constructor(
    private _ngxSurveyStore: NgxSurveyStore,
    private _surveyReducer: SurveyReducer,
    private _pagesReducer: PagesReducer,
  ) {
    this.surveySub = this._ngxSurveyStore.survey.subscribe(res => {
      console.log('res: ', res);
      this.survey = res;
    });

    this.ngxSurveyStateSub = this._ngxSurveyStore.ngxSurveyState.subscribe(res => {
      this.ngxSurveyState = res;
    });

    this.pagesSub = this._ngxSurveyStore.pages.subscribe(pagesRes => {
      console.log('pagesRes: ', pagesRes);
      this.pages = pagesRes;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.surveySub.unsubscribe();
    this.pagesSub.unsubscribe();
    this.ngxSurveyStateSub.unsubscribe();
  }

  handleBuilderOptionsChange(builderOptions: IBuilderOptions) {
    // TODO this.store.dispatch(new UpdateBuilderOptionsAction({ builderOptions }));
  }

  addPage() {
    const pageId = UUID.UUID();
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.ADD_PAGE_ACTION,
      payload: { surveyId: this.survey.id, pageId },
    });
  }

  reset() {
    const ngxSurveyState: NgxSurveyState = resetNgxSurveyState();
    ngxSurveyState.survey.isLoading = true;
    this._surveyReducer.surveyReducer({
      type: SurveyActionTypes.RESET_SURVEY_STATE_ACTION,
      payload: { ngxSurveyState },
    });
  }

  importSurvey(cb) {
    cb().subscribe(ngxSurveyState => {
      ngxSurveyState.survey.isLoading = true;
      this._surveyReducer.surveyReducer({
        type: SurveyActionTypes.IMPORT_SURVEY_STATE_ACTION,
        payload: { ngxSurveyState },
      });
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
