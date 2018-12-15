import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {UUID} from 'angular2-uuid';

import {NgxSurveyState} from '../../store/ngx-survey.state';
import * as survey from '../../store/survey/survey.actions';
import * as fromRoot from '../../store/ngx-survey.reducer';
import * as pages from '../../store/pages/pages.actions';
import {resetNgxSurveyState} from '../../store/utils';
import {IPageMap, INgxSurvey, IBuilderOptions} from '../../models/index';
import {UpdateBuilderOptionsAction} from '../../store/builder-options/builder-options.actions';

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
    private store: Store<NgxSurveyState>
  ) {
    this.surveySub = store.pipe(select(fromRoot.getSurvey)).subscribe(res => {
      this.survey = res;
    });

    this.pagesSub = store.pipe(select(fromRoot.getPages)).subscribe(pagesRes => {
      this.pages = pagesRes;
    });

    this.ngxSurveyStateSub = store.pipe(select(fromRoot.getNgxSurveyState)).subscribe(res => {
      this.ngxSurveyState = res;
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
    this.store.dispatch(new UpdateBuilderOptionsAction({ builderOptions }));
  }

  addPage() {
    const pageId = UUID.UUID();
    this.store.dispatch(new pages.AddPageAction({ surveyId: this.survey.id, pageId }));
  }

  reset() {
    const ngxSurveyState: NgxSurveyState = resetNgxSurveyState();
    ngxSurveyState.survey.isLoading = true;
    this.store.dispatch(new survey.ResetSurveyStateAction({ ngxSurveyState }));
  }

  importSurvey(cb) {
    cb().subscribe(ngxSurveyState => {
      ngxSurveyState.survey.isLoading = true;
      this.store.dispatch(new survey.ImportSurveySateAction({ ngxSurveyState }));
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
