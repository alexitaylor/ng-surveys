import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IPage} from '../../../models/page.model';
import {AppState} from '../../../store/app.state';
import {select, Store} from '@ngrx/store';
import {SurveyAddElementAction, SurveyRemovePageAction} from '../../../store/survey/survey.actions';
import * as fromRoot from '../../../store/app.reducer';

@Component({
  selector: 'sb-page-builder-container',
  templateUrl: './page-builder-container.component.html',
  styleUrls: ['./page-builder-container.component.scss']
})
export class PageBuilderContainerComponent implements OnInit {
  @Input() page: IPage;
  pageSize$: Observable<number>;

  constructor(
    private store: Store<AppState>
  ) {
    this.pageSize$ = this.store.pipe(select(fromRoot.getSurveyPageSize));
  }

  ngOnInit() {}

  removePage() {
    this.store.dispatch(new SurveyRemovePageAction({pageId: this.page.id}));
  }

  addElement() {
    this.store.dispatch(new SurveyAddElementAction({pageId: this.page.id}));
  }

  trackElement(index: number, element: any) {
    return element ? element.key : null;
  }
}
