import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {IPage, IPageMap} from '../../models/page.model';
import {isNil} from '../../store/utils';
import {IElementsMaps, INgSurvey} from '../../models';
import {NgSurveyStore} from '../../store/ng-survey.store';

@Component({
  selector: 'ngs-survey-viewer',
  templateUrl: './ng-survey-viewer.component.html',
  styleUrls: ['./ng-survey-viewer.component.scss']
})
export class NgSurveyViewerComponent implements OnInit, OnDestroy {
  survey: INgSurvey;
  surveyId: string;
  surveySub: Subscription;

  pageSize: number;
  pages: IPageMap;
  page: IPage;
  pageNext: IPage;
  pagePrev: IPage;

  elementsSub: Subscription;
  elements: IElementsMaps;

  showSummary: boolean;
  isLoading: boolean;

  isSurveyEmpty: boolean;

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private router: Router
  ) {
    this.surveySub = this._ngSurveyStore.survey.subscribe(res => {
      this.survey = res;
      this.surveyId = res.id;
    });
    this._ngSurveyStore.pages.subscribe(res => {
      this.pages = res;
      if (res) {
        this.pageSize = res.size;
      }
    });
    this.elementsSub = this._ngSurveyStore.elements.subscribe(res => {
      this.elements = res;
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

  ngOnInit() {
    this.isSurveyEmpty = this.checkSurveyEmpty();
  }

  ngOnDestroy(): void {
    this.surveySub.unsubscribe();
  }

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

  checkSurveyEmpty(): boolean {
    if (this.elements.size === 1) {
      if (this.page) {
        const elements = this.elements.get(this.page.id);
        if (elements.size === 1) {
          const element = elements.values().next().value;
          if (element.question.type === '' || element.question.type === null) {
            return true;
          }
        }
      } else {
        return true;
      }
    }

    return false;
  }
}
