import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import {Observable, Subscription} from 'rxjs';
import {IPage, IPageMap} from '../../models/page.model';
import {AppState} from '../../store/app.state';
import {PageViewerContainerComponent} from '../templates/page-viewer-container/page-viewer-container.component';

@Component({
  selector: 'sb-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
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
    private store: Store<AppState>,
    private router: Router
  ) {
    this.surveyName$ = store.pipe(select(fromRoot.getSurveyName));
    this.surveyDescription$ = store.pipe(select(fromRoot.getSurveyDescription));
    this.surveyIdSub = store.pipe(select(fromRoot.getSurveyId)).subscribe(res => {
      this.surveyId = res;
    });
    this.pagesSub = store.pipe(select(fromRoot.getPagesBySurveyId, { surveyId: this.surveyId })).subscribe(res => {
      this.pages = res;
      if (res) {
        this.pageSize = res.size;
      }
    });
    // TODO add NEW PAGES TO ROUTER ON INIT LOAD
    this.getCurrentPage();
    this.getNextPage();
    this.getPreviousPage();
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

  ngOnInit() {
  }

}
