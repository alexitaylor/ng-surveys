import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import * as fromRoot from '../../store/ngx-survey.reducer';
import {IPage, IPageMap} from '../../models/page.model';
import {NgxSurveyState} from '../../store/ngx-survey.state';
import {isNil} from '../../store/utils';
import {INgxSurvey} from '../../models';

@Component({
  selector: 'ngxs-survey-viewer',
  templateUrl: './ngx-survey-viewer.component.html',
  styleUrls: ['./ngx-survey-viewer.component.scss']
})
export class NgxSurveyViewerComponent implements OnInit {
  surveyName$: Observable<string>;
  surveyDescription$: Observable<string>;
  surveyIdSub: Subscription;
  survey: INgxSurvey;
  surveyId: string;
  pageSize: number;

  pagesSub: Subscription;
  pages: IPageMap;
  page: IPage;
  pageNext: IPage;
  pagePrev: IPage;

  showSummary: boolean;
  isLoading: boolean;

  constructor(
    private store: Store<NgxSurveyState>,
    private router: Router
  ) {
    this.surveyName$ = store.pipe(select(fromRoot.getSurveyName));
    this.surveyDescription$ = store.pipe(select(fromRoot.getSurveyDescription));
    this.surveyIdSub = store.pipe(select(fromRoot.getSurvey)).subscribe(res => {
      this.survey = res;
      this.surveyId = res.id;
    });
    this.pagesSub = store.pipe(select(fromRoot.getPages)).subscribe(res => {
      this.pages = res;
      if (res) {
        this.pageSize = res.size;
      }
    });

    this.initNavigation();

    router.events.subscribe( event => {
      if (event instanceof NavigationStart) {
        this.pageNext = null;
        this.pagePrev = null;
        this.isLoading = true;
      }

      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.initNavigation();
          this.isLoading = false;
        }, 10);
      }

      if (event instanceof NavigationError) {
        setTimeout(() => {
          this.isLoading = false;
        }, 10);

        throw event.error;
      }
    });
  }

  ngOnInit() {}

  initNavigation() {
    const pageUrlId = this.getCurrentPageUrlId();
    this.showSummary = false;
    this.getCurrentPage(pageUrlId);
    this.getNextPage(pageUrlId);
    this.getPreviousPage(pageUrlId);
  }

  nextPage() {
    if (this.page.pageFlow.label === 'pageFlow.goToPage') {
      this.router.navigate([`/viewer/${this.page.pageFlow.pageId}`]);
    } else {
      this.router.navigate([`/viewer/${this.pageNext.id}`]);
    }
  }

  getCurrentPage(pageUrlId: string) {
    if (!!this.pages) {
      this.pages.forEach(page => {
        if (pageUrlId === page.id) {
          this.page = page;
        }
      });
    }

    if (pageUrlId === 'summary') {
      this.showSummary = true;
    } else if (!this.page) { // If Page Url does not match any page's id default to first page
      const firstPage = Array.from(this.pages)[0];
      this.router.navigate([`/viewer/${firstPage[1].id}`]);
    }
  }

  getNextPage(pageUrlId: string) {
    let isFound = false;

    this.pages.forEach((page, key) => {
      if (isFound) {
        this.pageNext = page;
        isFound = false;
      }
      if (pageUrlId === key) {
        isFound = true;
      }
    });

    // If last page and summary exist queue summary as last page
    if (isNil(this.pageNext) && pageUrlId !== 'summary') {
      if (!isNil(this.survey.summary)) {
       this.pageNext = { id: 'summary', surveyId: '' };
      }
    }
  }

  getPreviousPage(pageUrlId: string) {
    let temp = null;

    this.pages.forEach((page, key) => {
      if (pageUrlId === key) {
        this.pagePrev = temp;
      }
      temp = page;
    });

    if (isNil(this.pagePrev) && pageUrlId === 'summary') {
      this.pagePrev = temp;
    }
  }

  getCurrentPageUrlId(): string {
    const pageUrlArray = this.router.url.split('/');
    return pageUrlArray.pop();
  }
}
