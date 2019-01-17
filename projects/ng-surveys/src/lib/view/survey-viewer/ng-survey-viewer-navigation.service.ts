import { Injectable } from '@angular/core';
import {IElementsMaps, IPage, IPageMap} from '../../models';
import {NgSurveyStore} from '../../store/ng-survey.store';
import {BehaviorSubject} from 'rxjs';
import {IPageLinkedList, IPageLinkedListNode, PageLinkedList, PageLinkedListNode} from './page-linked-list';

@Injectable({
  providedIn: 'root'
})
export class NgSurveyViewerNavigationService {
  public pageLinkedList = new BehaviorSubject<IPageLinkedList>(new PageLinkedList());
  public currentPageNode = new BehaviorSubject<IPageLinkedListNode>(new PageLinkedListNode());
  public prevPageLinkedList = new BehaviorSubject<IPageLinkedList>(new PageLinkedList());

  private pages: IPageMap;
  public page = new BehaviorSubject<IPage>(null);
  private elements: IElementsMaps;

  constructor(
    private _ngSurveyStore: NgSurveyStore
  ) {
    this.initPageStack();
  }

  public setGoToPage(pageId: string): IPage {
    const currentPage: IPageLinkedListNode = this.currentPageNode.value;
    const nextPage: IPageLinkedListNode = this.findByPageId(pageId);
    this.currentPageNode.next(nextPage);
    this.prevPageLinkedList.value.append(currentPage.page);
    this.prevPageLinkedList.next(this.prevPageLinkedList.value);
    return nextPage.page;
  }

  public setNextPage(): IPage {
    const currentPage: IPageLinkedListNode = this.currentPageNode.value;
    const nextPage: IPageLinkedListNode = currentPage.next;

    this.prevPageLinkedList.value.append(currentPage.page);
    this.prevPageLinkedList.next(this.prevPageLinkedList.value);

    if (!!nextPage) {
      this.currentPageNode.next(nextPage);
      return nextPage.page;
    } else {
      return { id: 'summary', surveyId: '' };
    }
  }

  public setPrevPage(): IPage {
    // Get last visited page
    const prevPage: IPageLinkedListNode = this.prevPageLinkedList.value.tail;
    // Find last visited page in page linked list and assign it as current page
    const currentPageNode: IPageLinkedListNode = this.pageLinkedList.value.find(prevPage.page);
    this.currentPageNode.next(currentPageNode);
    // Update prev page linked list by deleting new current page node
    this.prevPageLinkedList.value.delete(prevPage.page);
    this.prevPageLinkedList.next(this.prevPageLinkedList.value);
    return currentPageNode.page;
  }

  public findByPageId(pageId: string): IPageLinkedListNode {
    const pageNode: IPageLinkedListNode = this.pageLinkedList.value.findByPageId(pageId);
    this.currentPageNode.next(pageNode);
    return pageNode;
  }

  private initPageStack(): void {
    this._ngSurveyStore.pages.subscribe(res => {
      this.pages = res;
      const pageLinkedList = new PageLinkedList();
      this.pages.forEach((el) => {
        pageLinkedList.append(el);
      });
      this.pageLinkedList.next(pageLinkedList);
      // Assign head as current page
      this.currentPageNode.next(this.pageLinkedList.value.head);
    });

    // Get Elements
    this._ngSurveyStore.elements.subscribe(res => {
      this.elements = res;
    });
  }

  checkSurveyEmpty(): boolean {
    if (this.elements.size === 1) {
      if (this.page.value) {
        const elements = this.elements.get(this.page.value.id);
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
