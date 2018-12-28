import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {UUID} from 'angular2-uuid';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

import {IPage, IPageMap} from '../../../models/page.model';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {IElementsMap} from '../../../models/elements.model';
import {PagesActionTypes} from '../../../store/pages/pages.actions';
import {SurveyReducer} from '../../../store/survey/survey.reducer';
import {NgxSurveyStore} from '../../../store/ngx-survey.store';
import {PagesReducer} from '../../../store/pages/pages.reducer';

@Component({
  selector: 'ngxs-page-builder-container',
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
    private _ngxSurveyStore: NgxSurveyStore,
    private _pagesReducer: PagesReducer,
    // private store: Store<NgxSurveyState>
  ) {
  }

  ngOnInit() {
    this.pageSizeSub = this._ngxSurveyStore.pages.subscribe(res => {
      this.pageSize = res.size;
    });
    // this.elementsSub = this.store.pipe(select(fromRoot.getElementsByPageId, { pageId: this.page.id })).subscribe(res => {
    //   this.elements = res;
    //   if (res) {
    //     this.elementsSize = res.size;
    //     this.setSavedMap();
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnDestroy() {
    // TODO this.elementsSub.unsubscribe();
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
    const pageId = UUID.UUID();
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.INSERT_PAGE_ACTION,
      payload: { previousPageId, surveyId: this.surveyId, pageId },
    });
  }

  movePageDown(pageId: string) {
    // this.store.dispatch(new pages.MovePageDownAction({ pageId }));
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.MOVE_PAGE_DOWN_ACTION,
      payload: { pageId },
    });
  }

  movePageUp(pageId: string) {
    // this.store.dispatch(new pages.MovePageUpAction({ pageId }));
    this._pagesReducer.pagesReducer({
      type: PagesActionTypes.MOVE_PAGE_UP_ACTION,
      payload: { pageId },
    });
  }

  addElement(pageId: string) {
    // this.store.dispatch(new elements.AddElementAction({ pageId, type: 'question' }));
  }

  addParagraph(pageId: string) {
    // this.store.dispatch(new elements.AddElementAction({ pageId, type: 'paragraph' }));
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
    // this.store.dispatch(new elements.DragElementAction({
    //   pageId,
    //   startIndex: event.previousIndex,
    //   endIndex: event.currentIndex,
    // }));
  }

  handleIsSavedEvent({ key, isSaved }) {
    this.isSavedMap.set(key, isSaved);
  }

  private setSavedMap() {
    this.elements.forEach((value, key) => {
      if (value.isSaved) {
        this.isSavedMap.set(key, true);
      } else {
        this.isSavedMap.set(key, false);
      }
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
