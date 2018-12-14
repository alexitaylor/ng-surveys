import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import * as fromRoot from '../../store/ngx-survey.reducer';
import {IPage, IPageMap} from '../../models/page.model';
import {NgxSurveyState} from '../../store/ngx-survey.state';

@Component({
  selector: 'ngxs-ngx-survey-viewer',
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

    this.createPagesRoutes();
    this.getCurrentPage();
    this.getNextPage();
    this.getPreviousPage();
  }

  ngOnInit() {}

  nextPage() {
    if (this.page.pageFlow.label === 'pageFlow.goToPage') {
      this.router.navigate([`/viewer/${this.page.pageFlow.pageId}`]);
    } else {
      this.router.navigate([`/viewer/${this.pageNext.id}`]);
    }
  }

  createPagesRoutes() {
    const pageRoute = [];
    this.pages.forEach(page => {
      pageRoute.push({
        path: `viewer/${page.id}`,
        component: NgxSurveyViewerComponent,
      });
    });

    this.router.config.forEach(route => {
      if (route.path === '') {
        route.children.unshift(...pageRoute);
      }
    });
  }

  getCurrentPage() {
    this.pages.forEach(page => {
      const pageUrlId = this.getCurrentPageUrlId();

      if (pageUrlId === page.id) {
        this.page = page;
      }
    });

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
