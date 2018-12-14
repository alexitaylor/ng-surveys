import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import * as fromRoot from '../../store/ngx-survey.reducer';
import {IPage, IPageMap} from '../../models/page.model';
import {NgxSurveyState} from '../../store/ngx-survey.state';

@Component({
  selector: 'ngxs-survey-viewer',
  templateUrl: './ngx-survey-viewer.component.html',
  styleUrls: ['./ngx-survey-viewer.component.scss']
})
export class NgxSurveyViewerComponent implements OnInit {
  surveyName$: Observable<string>;
  surveyDescription$: Observable<string>;
  surveyIdSub: Subscription;
  surveyId: string;
  pageSize: number;

  pagesSub: Subscription;
  pages: IPageMap;
  page: IPage;
  pageNext: IPage;
  pagePrev: IPage;

  isLoading: boolean;

  constructor(
    private store: Store<NgxSurveyState>,
    private router: Router
  ) {
    this.surveyName$ = store.pipe(select(fromRoot.getSurveyName));
    this.surveyDescription$ = store.pipe(select(fromRoot.getSurveyDescription));
    this.surveyIdSub = store.pipe(select(fromRoot.getSurveyId)).subscribe(res => {
      this.surveyId = res;
    });
    this.pagesSub = store.pipe(select(fromRoot.getPages)).subscribe(res => {
      this.pages = res;
      if (res) {
        this.pageSize = res.size;
      }
    });
    this.getCurrentPage();
    this.getNextPage();
    this.getPreviousPage();

    router.events.subscribe( event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      }

      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.getCurrentPage();
          this.getNextPage();
          this.getPreviousPage();
          this.isLoading = false;
        }, 300);
      }

      if (event instanceof NavigationError) {
        setTimeout(() => {
          this.isLoading = false;
        }, 300);

        throw event.error;
      }
    });
  }

  ngOnInit() {}

  nextPage() {
    if (this.page.pageFlow.label === 'pageFlow.goToPage') {
      this.router.navigate([`/viewer/${this.page.pageFlow.pageId}`]);
    } else {
      this.router.navigate([`/viewer/${this.pageNext.id}`]);
    }
  }

  getCurrentPage() {
    if (!!this.pages) {
      this.pages.forEach(page => {
        const pageUrlId = this.getCurrentPageUrlId();
        if (pageUrlId === page.id) {
          this.page = page;
        }
      });
    }

    if (!this.page) {
      const firstPage = Array.from(this.pages)[0];
      this.router.navigate([`/viewer/${firstPage[1].id}`]);
    }
  }

  getNextPage() {
    let isFound = false;

    this.pages.forEach((page, key) => {
      const pageUrlId = this.getCurrentPageUrlId();
      if (isFound) {
        this.pageNext = page;
        isFound = false;
      }
      if (pageUrlId === key) {
        isFound = true;
      }
    });
  }

  getPreviousPage() {
    let temp;

    this.pages.forEach((page, key) => {
      const pageUrlId = this.getCurrentPageUrlId();
      if (pageUrlId === key) {
        this.pagePrev = temp;
      }
      temp = page;
    });
  }

  getCurrentPageUrlId(): string {
    const pageUrlArray = this.router.url.split('/');
    return pageUrlArray.pop();
  }
}
