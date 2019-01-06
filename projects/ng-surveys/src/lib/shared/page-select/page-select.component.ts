import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {IPageMap} from '../../models';
import {IPageFlow, PageFlow} from '../../models';
import {NgSurveyStore} from '../../store/ng-survey.store';
import {PagesReducer} from '../../store/pages/pages.reducer';
import {PagesActionTypes} from '../../store/pages/pages.actions';
import {OptionAnswersReducer} from '../../store/option-answers/option-answers.reducer';
import {OptionAnswersActionTypes} from '../../store/option-answers/option-answers.actions';

@Component({
  selector: 'ngs-page-select',
  templateUrl: './page-select.component.html',
  styleUrls: ['./page-select.component.scss']
})
export class PageSelectComponent implements OnInit, OnDestroy {
  @Input() isPage: boolean;
  @Input() surveyId: string;
  @Input() pageId: string;

  @Input() pageFlow: IPageFlow;

  // Option Template Inputs
  @Input() elementId: string;
  @Input() optionAnswerId: string;
  @Input() isOptionAnswerSaved: boolean;
  @Input() questionPageFlowModifier: boolean;

  pagesSub: Subscription;
  pages: IPageMap;

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private _pagesReducer: PagesReducer,
    private _optionAnswersReducer: OptionAnswersReducer,
  ) {
  }

  ngOnInit() {
    this.pagesSub = this._ngSurveyStore.pages.subscribe(res => this.pages = res);
  }

  ngOnDestroy() {
    this.pagesSub.unsubscribe();
  }

  handlePageNavNext(value) {
    if (this.isPage) {
      const pageFlow = new PageFlow();
      if (value === 'pageFlow.goToNextPage') {
        pageFlow.nextPage = true;
        pageFlow.label = 'pageFlow.goToNextPage';
      } else {
        pageFlow.nextPage = false;
        pageFlow.label = 'pageFlow.goToPage';
        pageFlow.pageId = value;
      }

      this._pagesReducer.pagesReducer({
        type: PagesActionTypes.UPDATE_PAGE_PAGE_FLOW_ACTION,
        payload: {
          pageId: this.pageId,
          pageFlow,
        },
      });
    } else {
      const pageFlow = new PageFlow();
      if (value === 'pageFlow.goToNextPage') {
        pageFlow.nextPage = true;
        pageFlow.label = 'pageFlow.goToNextPage';
      } else {
        pageFlow.nextPage = false;
        pageFlow.label = 'pageFlow.goToPage';
        pageFlow.pageId = value;
      }

      this._optionAnswersReducer.optionAnswersReducer({
        type: OptionAnswersActionTypes.UPDATE_OPTION_ANSWERS_PAGE_FLOW,
        payload: {
          elementId: this.elementId,
          optionAnswerId: this.optionAnswerId,
          pageFlow
        }
      });
    }
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
