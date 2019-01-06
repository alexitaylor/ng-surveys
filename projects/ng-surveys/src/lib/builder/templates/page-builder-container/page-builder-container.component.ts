import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import { UUID } from '../../../store/utils';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

import {IPage, IPageMap} from '../../../models/page.model';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {IElementsMap} from '../../../models/elements.model';
import {PagesActionTypes} from '../../../store/pages/pages.actions';
import {NgSurveyStore} from '../../../store/ng-survey.store';
import {PagesReducer} from '../../../store/pages/pages.reducer';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';

@Component({
  selector: 'ngs-page-builder-container',
  templateUrl: './page-builder-container.component.html',
  styleUrls: ['./page-builder-container.component.scss']
})
export class PageBuilderContainerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() surveyId: string;
  @Input() page: IPage;
  @Input() pages: IPageMap;
  pageSizeSub: Subscription;
  pageSize: number;
  elementsSub: Subscription;
  elements: IElementsMap;
  elementsSize: number;
  isEditPage: boolean;
  isSavedMap = new Map<string, boolean>();

  constructor(
    private _ngSurveyStore: NgSurveyStore,
    private _pagesReducer: PagesReducer,
    private _elementsReducer: ElementsReducer,
  ) {
  }

  ngOnInit() {
    this.pageSizeSub = this._ngSurveyStore.pages.subscribe(res => {
      this.pageSize = res.size;
    });
    this.elementsSub = this._ngSurveyStore.elements.subscribe(res => {
      this.elements = res.get(this.page.id);
      if (res) {
        this.elementsSize = res.size;
        this.setSavedMap();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnDestroy() {
    this.elementsSub.unsubscribe();
    this.pageSizeSub.unsubscribe();
  }

  removePage(pageId: string) {
    const elementIds = this.elements ? Array.from(this.elements).reduce((array, el) => [...array, el[0]], []) : null;
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.REMOVE_PAGE_ACTION,
      payload: { pageId, elementIds },
    });
  }

  insertPage(previousPageId: string) {
    const pageId = UUID();
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.INSERT_PAGE_ACTION,
      payload: { previousPageId, surveyId: this.surveyId, pageId },
    });
  }

  movePageDown(pageId: string) {
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.MOVE_PAGE_DOWN_ACTION,
      payload: { pageId },
    });
  }

  movePageUp(pageId: string) {
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.MOVE_PAGE_UP_ACTION,
      payload: { pageId },
    });
  }

  addElement(pageId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.ADD_ELEMENT_ACTION,
      payload: { pageId, type: 'question' },
    });
  }

  addParagraph(pageId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.ADD_ELEMENT_ACTION,
      payload: { pageId, type: 'paragraph' },
    });
  }

  onEditPageClick(pageId: string) {
    this.isEditPage = true;
    setTimeout(() => {
      this.editPageName(pageId);
      this.editPageDescription(pageId);
    }, 300);
  }

  editPageName(pageId: string) {
    const $pageNameInput = document.getElementById(`page-name-input-${pageId}`);

    fromEvent($pageNameInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(name => {
      this._pagesReducer.pagesReducer({
        type: PagesActionTypes.UPDATE_PAGE_NAME_ACTION,
        payload: { pageId, name },
      });
    });
  }

  editPageDescription(pageId: string) {
    const $pageDescriptionInput = document.getElementById(`page-description-input-${pageId}`);

    fromEvent($pageDescriptionInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(description => {
      this._pagesReducer.pagesReducer({
        type: PagesActionTypes.UPDATE_PAGE_DESCRIPTION_ACTION,
        payload: { pageId, description },
      });
    });
  }

  drop(event: CdkDragDrop<string[]>, pageId: string) {
    this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.DRAG_ELEMENT_ACTION,
      payload: {
        pageId,
        startIndex: event.previousIndex,
        endIndex: event.currentIndex,
      },
    });
  }

  handleIsSavedEvent({ key, isSaved }) {
    this.isSavedMap.set(key, isSaved);
  }

  private setSavedMap() {
    if (this.elements) {
      this.elements.forEach((value, key) => {
        if (value.isSaved) {
          this.isSavedMap.set(key, true);
        } else {
          this.isSavedMap.set(key, false);
        }
      });
    }
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
