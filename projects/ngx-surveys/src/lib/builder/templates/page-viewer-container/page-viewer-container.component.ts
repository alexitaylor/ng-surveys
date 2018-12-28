import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {IElementsMap} from '../../../models/elements.model';
import {IPage} from '../../../models/page.model';
import {NgxSurveyStore} from '../../../store/ngx-survey.store';

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
    private _ngxSurveyStore: NgxSurveyStore
  ) { }

  ngOnInit() {
    this.elementsSub = this._ngxSurveyStore.elements.subscribe(res => {
      this.elements = res.get(this.page.id);
      if (res) {
        this.elementsSize = this.elements.size;
      }
    });
  }

  trackElement(index: number, item: any) {
    return item ? item.key : null;
  }
}
