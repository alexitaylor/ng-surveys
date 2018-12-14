import {Component, OnDestroy, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {UUID} from 'angular2-uuid';

import {NgxSurveyState} from '../../store/ngx-survey.state';
import * as survey from '../../store/survey/survey.actions';
import * as fromRoot from '../../store/ngx-survey.reducer';
import * as pages from '../../store/pages/pages.actions';
import {resetNgxSurveyState} from '../../store/utils';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import {IPageMap} from '../../models/page.model';
import {INgxSurvey} from '../../models/ngx-survey.model';
=======
import {IPageMap, INgxSurvey, IBuilderOptions} from '../../models/index';
import {UpdateBuilderOptionsAction} from '../../store/builder-options/builder-options.actions';
>>>>>>> Stashed changes
=======
import {IPageMap, INgxSurvey, IBuilderOptions} from '../../models/index';
import {UpdateBuilderOptionsAction} from '../../store/builder-options/builder-options.actions';
>>>>>>> Stashed changes

@Component({
  selector: 'ngxs-builder-viewer',
  templateUrl: './ngx-builder-viewer.component.html',
  styleUrls: ['./ngx-builder-viewer.component.scss']
})
export class NgxBuilderViewerComponent implements OnInit, OnDestroy {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
  private _options: IBuilderOptions;
  @Input() set options(value: IBuilderOptions) {
    this._options = value;
    console.log('value: ', value);
    this.handleBuilderOptionsChange(this._options);
  }
  get options(): IBuilderOptions {
    return this._options;
  }

>>>>>>> Stashed changes
  surveySub: Subscription;
  survey: INgxSurvey;

  surveyNameSub$: Subscription;
  surveyDescriptionSub$: Subscription;

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
  }

  ngOnInit() {
    setTimeout(() => {
      if (!this.survey.isLoading) {
        this.handleSurveyNameChange();
        this.handleSurveyDescriptionChange();
      }
    }, 300);
  }

  ngOnDestroy() {
    this.surveySub.unsubscribe();
    this.surveyNameSub$.unsubscribe();
    this.surveyNameSub$.unsubscribe();
    this.pagesSub.unsubscribe();
  }

  handleBuilderOptionsChange(builderOptions: IBuilderOptions) {
    this.store.dispatch(new UpdateBuilderOptionsAction({ builderOptions }));
  }

  handleSurveyNameChange() {
    const $surveyName = document.getElementById('surveyName');

    this.surveyNameSub$ = fromEvent($surveyName, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(name => {
      this.store.dispatch(new survey.SurveyNameChangedAction({ name }));
    });
  }

  handleSurveyDescriptionChange() {
    const $surveyDescription = document.getElementById('surveyDescription');

    this.surveyDescriptionSub$ = fromEvent($surveyDescription, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(description => {
      this.store.dispatch(new survey.SurveyDescriptionChangedAction({ description }));
    });
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

  importSurvey() {
    console.log('import');
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
