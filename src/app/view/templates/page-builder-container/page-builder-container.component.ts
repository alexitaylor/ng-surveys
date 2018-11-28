import {Component, Input, OnInit} from '@angular/core';
import {IPage, IPageMap} from '../../../models/page.model';
import {AppState} from '../../../store/app.state';
import {Store} from '@ngrx/store';
import {SurveyAddElementAction, SurveyRemovePageAction} from '../../../store/survey/survey.actions';

@Component({
  selector: 'sb-page-builder-container',
  templateUrl: './page-builder-container.component.html',
  styleUrls: ['./page-builder-container.component.scss']
})
export class PageBuilderContainerComponent implements OnInit {
  @Input() page: IPage;
  @Input() pages: IPageMap;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  removePage() {
    this.store.dispatch(new SurveyRemovePageAction(this.page.id));
  }

  addElement() {
    this.store.dispatch(new SurveyAddElementAction(this.page.id));
  }

}
