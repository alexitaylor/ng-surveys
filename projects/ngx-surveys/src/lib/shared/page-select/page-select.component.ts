import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {NgxSurveyState} from '../../store/ngx-survey.state';
import * as fromRoot from '../../store/ngx-survey.reducer';
import {IPageMap} from '../../models/page.model';
import * as optionAnswers from '../../store/option-answers/option-answers.actions';
import {IPageFlow, PageFlow} from '../../models/page-flow.model';
import * as pages from '../../store/pages/pages.actions';

@Component({
  selector: 'ngxs-page-select',
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
  // pageNavNext = 'pageFlow.goToNextPage';

  constructor(
    private store: Store<NgxSurveyState>,
  ) {
  }

  ngOnInit() {
    this.pagesSub = this.store.pipe(select(fromRoot.getPages)).subscribe(res => this.pages = res);
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

      this.store.dispatch(new pages.UpdatePagePageFlowAction({
        pageId: this.pageId,
        pageFlow,
      }));
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

      this.store.dispatch(new optionAnswers.UpdateOptionAnswerPageFlow({
        elementId: this.elementId,
        optionAnswerId: this.optionAnswerId,
        pageFlow
      }));
    }
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
