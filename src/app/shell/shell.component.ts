import { Component, OnInit, OnDestroy } from '@angular/core';
import {IPageMap} from '../models/page.model';
import {AppState} from '../store/app.state';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import * as fromRoot from '../store/app.reducer';
import {Subscription} from 'rxjs';
import {ViewerComponent} from '../view/viewer/viewer.component';

@Component({
  selector: 'sb-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  pagesSub: Subscription;
  surveyIdSub: Subscription;
  surveyId: string;
  pages: IPageMap;

  links: Array<{ text: string, path: string }> = [];

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.surveyIdSub = store.pipe(select(fromRoot.getSurveyId)).subscribe(res => {
      this.surveyId = res;
    });

    this.pagesSub = store.pipe(select(fromRoot.getPagesBySurveyId, { surveyId: this.surveyId })).subscribe(res => {
      this.pages = res;
    });

    // Todo remove after done testing
    this.pages.forEach(page => {
      this.links.push({ text: 'page1', path: `viewer/${page.id}`});
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.pagesSub.unsubscribe();
    this.surveyIdSub.unsubscribe();
  }
}
