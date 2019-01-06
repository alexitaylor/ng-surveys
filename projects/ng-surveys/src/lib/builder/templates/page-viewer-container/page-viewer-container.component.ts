import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IElementsMap} from '../../../models/elements.model';
import {IPage} from '../../../models/page.model';
import {NgSurveyStore} from '../../../store/ng-survey.store';

@Component({
  selector: 'ngs-page-viewer-container',
  templateUrl: './page-viewer-container.component.html',
  styleUrls: ['./page-viewer-container.component.scss']
})
export class PageViewerContainerComponent implements OnInit {
  @Input() page: IPage;
  elementsSub: Subscription;
  elements: IElementsMap;
  elementsSize: number;

  constructor(
    private _ngSurveyStore: NgSurveyStore
  ) { }

  ngOnInit() {
    this.elementsSub = this._ngSurveyStore.elements.subscribe(res => {
      this.elements = this.page ? res.get(this.page.id) : null;
      if (res) {
        this.elementsSize = res.size;
      }
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
