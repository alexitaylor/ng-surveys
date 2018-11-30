import {Component, Input, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IPage, IPageMap} from '../../../models/page.model';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import {
  SurveyAddElementAction, SurveyInsertPageAction, SurveyMovePageDownAction, SurveyMovePageUpAction, SurveyRemovePageAction,
  SurveyUpdatePageDescriptionAction,
  SurveyUpdatePageNameAction, SurveyUpdatePagePageFlowAction
} from '../../../store/survey/survey.actions';
import * as fromRoot from '../../../store/app.reducer';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {PageFlow} from '../../../models/page-flow.model';

@Component({
  selector: 'sb-page-builder-container',
  templateUrl: './page-builder-container.component.html',
  styleUrls: ['./page-builder-container.component.scss']
})
export class PageBuilderContainerComponent implements OnInit {
  @Input() page: IPage;
  @Input() pages: IPageMap;
  pageSize$: Observable<number>;
  isEditPage: boolean;
  pageNavNext = 'goToNextPage';

  constructor(
    private store: Store<AppState>
  ) {
    this.pageSize$ = this.store.pipe(select(fromRoot.getSurveyPageSize));
  }

  ngOnInit() {
  }

  removePage() {
    this.store.dispatch(new SurveyRemovePageAction({ pageId: this.page.id }));
  }

  insertPage() {
    this.store.dispatch(new SurveyInsertPageAction({ previousPageId: this.page.id }));
  }

  movePageDown() {
    this.store.dispatch(new SurveyMovePageDownAction({ pageId: this.page.id }));
  }

  movePageUp() {
    this.store.dispatch(new SurveyMovePageUpAction({ pageId: this.page.id }));
  }

  addElement() {
    this.store.dispatch(new SurveyAddElementAction({pageId: this.page.id}));
  }

  onEditPageClick() {
    this.isEditPage = true;
    setTimeout(() => {
      this.editPageName();
      this.editPageDescription();
    }, 300);
  }

  editPageName() {
    const $pageNameInput = document.getElementById(`page-name-input-${this.page.id}`);

    fromEvent($pageNameInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(name => {
      this.store.dispatch(new SurveyUpdatePageNameAction({ pageId: this.page.id, name}));
    });
  }

  editPageDescription() {
    const $pageDescriptionInput = document.getElementById(`page-description-input-${this.page.id}`);

    fromEvent($pageDescriptionInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(description => {
      this.store.dispatch(new SurveyUpdatePageDescriptionAction({ pageId: this.page.id, description}));
    });
  }

  handlePageNavNext(value) {
    const pageFlow = new PageFlow();
    if (value === 'goToNextPage') {
      pageFlow.nextPage = true;
      pageFlow.label = 'pageFlow.goToNextPage';
    } else {
      pageFlow.nextPage = false;
      pageFlow.label = 'pageFlow.goToPage';
      pageFlow.pageId = value;
    }

    this.store.dispatch(new SurveyUpdatePagePageFlowAction({
      pageId: this.page.id,
      pageFlow
    }));
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
