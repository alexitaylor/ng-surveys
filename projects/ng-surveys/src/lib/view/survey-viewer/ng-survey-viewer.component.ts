import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {IPage, IPageMap} from '../../models/page.model';
import {IElementsMap, IElementsMaps, INgSurvey, IOptionAnswersMaps, IPageFlow} from '../../models';
import {NgSurveyStore} from '../../store/ng-survey.store';
import {NgSurveyViewerNavigationService} from './ng-survey-viewer-navigation.service';
import {isNil} from '../../store/utils';

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

  optionAnswersSub: Subscription;
  optionAnswers: IOptionAnswersMaps;

  isPrevPageEmpty: boolean;
  isNextPageEmpty: boolean;

  showSummary: boolean;
  isLoading: boolean;

  isSurveyEmpty: boolean;

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private router: Router,
    private surveyViewerNavigation$: NgSurveyViewerNavigationService,
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
    this.optionAnswersSub = this._ngSurveyStore.optionAnswers.subscribe(res => {
      this.optionAnswers = res;
    });

    this.initNavigation();

    router.events.subscribe( event => {
      if (event instanceof NavigationStart) {
        this.isPrevPageEmpty = false;
        this.isNextPageEmpty = false;
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
    const currentPageNode = this.surveyViewerNavigation$.currentPageNode.value;
    const pageUrlId = this.getCurrentPageUrlId();

    this.showSummary = false;
    this.page = currentPageNode.page;
    this.isPrevPageEmpty = isNil(currentPageNode.previous);
    this.isNextPageEmpty = isNil(currentPageNode.next) && isNil(this.survey.summary);

    if (pageUrlId === 'summary') {
      this.showSummary = true;
      this.isNextPageEmpty = true;
    }
  }

  nextPage() {
    const elementPageFlowModifier = this.getElementPageFlowModifier();
    if (!!elementPageFlowModifier) {
      this.pageNext = this.surveyViewerNavigation$.setGoToPage(elementPageFlowModifier.pageId);
    } else if (this.page.pageFlow.label === 'pageFlow.goToPage') {
      this.pageNext = this.surveyViewerNavigation$.setGoToPage(this.page.pageFlow.pageId);
    } else {
      this.pageNext = this.surveyViewerNavigation$.setNextPage();
    }

    this.router.navigate([`/viewer/${this.pageNext.id}`]);
  }

  prevPage() {
    this.pagePrev = this.surveyViewerNavigation$.setPrevPage();
    this.router.navigate([`/viewer/${this.pagePrev.id}`]);
  }

  getElementPageFlowModifier(): IPageFlow {
    const pageElements: IElementsMap = this.elements.get(this.page.id);
    let isElementPageFlowModifier = false;
    let elementPageFlowModifier;

    pageElements.forEach((element, key) => {
      if (element.question.pageFlowModifier) {
        isElementPageFlowModifier = true;
        elementPageFlowModifier = element;
      }
    });

    if (isElementPageFlowModifier && !!elementPageFlowModifier) {
      const elementOptionAnswers = this.optionAnswers.get(elementPageFlowModifier.id);
      let isPageFlowModifier = false;
      let optionAnswersPageFlowModifier;

      elementOptionAnswers.forEach((optionAnswer, key) => {
        if (elementPageFlowModifier.question.answer === optionAnswer.value && optionAnswer.pageFlow.label === 'pageFlow.goToPage') {
          isPageFlowModifier = true;
          optionAnswersPageFlowModifier = optionAnswer.pageFlow;
        }
      });

      if (isPageFlowModifier && !!optionAnswersPageFlowModifier) {
        return optionAnswersPageFlowModifier;
      }
    }

    return null;
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
