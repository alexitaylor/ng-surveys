import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IElementsMap} from '../../../models/elements.model';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../../store/ngx-survey.reducer';
import {NgxSurveyState} from '../../../store/ngx-survey.state';
import {IPage} from '../../../models/page.model';

@Component({
  selector: 'ngxs-page-viewer-container',
  templateUrl: './page-viewer-container.component.html',
  styleUrls: ['./page-viewer-container.component.scss']
})
export class PageViewerContainerComponent implements OnInit {
  @Input() page: IPage;
  elementsSub: Subscription;
  elements: IElementsMap;
  elementsSize: number;

  constructor(
    private store: Store<NgxSurveyState>
  ) { }

  ngOnInit() {
    this.elementsSub = this.store.pipe(select(fromRoot.getElementsByPageId, { pageId: this.page.id })).subscribe(res => {
      this.elements = res;
      if (res) {
        this.elementsSize = res.size;
      }
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
